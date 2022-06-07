

Function Test-WithCulture {
    [cmdletbinding(DefaultParameterSetName = "scriptblock")]
    Param (
        [Parameter(Position = 0, Mandatory, HelpMessage = "Enter a new culture like de-de")]
        [ValidateNotNullOrEmpty()]
        [System.Globalization.CultureInfo]$Culture,
        [Parameter(Position = 1,ParameterSetName = "scriptblock", Mandatory, HelpMessage = "Enter a scriptblock to execute using the specified culture")]
        [ValidateNotNullorEmpty()]
        [scriptblock]$Scriptblock,
        [Parameter(ParameterSetName = "file", Mandatory, HelpMessage = "Enter the path to a PowerShell script file to execute using the specified culture")]
        [ValidateNotNullorEmpty()]
        [ValidatePattern('\.ps1$')]
        [ValidateScript( {
                if (Test-Path $_ ) {
                    $True
                }
                else {
                    throw "Failed to find the file $_."
                    $false
                }
            })]
        [scriptblock]$FilePath,
        [Parameter(HelpMessage = "Specify an array of positional arguments to pass to the scriptblock for file.")]
        [object[]]$ArgumentList
    )
    Write-Verbose "Starting $($myinvocation.mycommand)"
    Write-Verbose "Testing with culture-language $culture. [$($culture.DisplayName)]"

    Write-Verbose "Saving current culture values"
    #save current culture values
    $OldCulture = $PSCulture
    $OldUICulture = $PSUICulture

    Write-Verbose "Setting the new culture"
    [System.Threading.Thread]::CurrentThread.CurrentCulture = $culture
    [System.Threading.Thread]::CurrentThread.CurrentUICulture = $culture

    #update PSBoundparameters which will be splatted to Invoke-Command

    [void]$PSBoundParameters.remove("Culture")
    [void]$PSBoundParameters.add("ErrorAction", "stop")
    Try {
        #run the command
        if ($PSCmdlet.ParameterSetName -eq "scriptblock") {
            Write-Verbose "Testing $scriptblock"
        }
        else {
            Write-Verbose "Invoking file $Filepath"
        }
        Invoke-command @PSBoundParameters
    }
    Catch {
        Write-Warning "There was a problem. $($_.exception.message)"
    }
    Finally {
        Write-Verbose "Restoring original settings"
        #roll culture settings back - erring on the side of caution.
        [System.Threading.Thread]::CurrentThread.CurrentCulture = $OldCulture
        [System.Threading.Thread]::CurrentThread.CurrentUICulture = $OldUICulture
    }
    Write-Verbose "Ending $($myinvocation.mycommand)"
} #end function

Register-ArgumentCompleter -CommandName Test-WithCulture -ParameterName Culture -ScriptBlock {
    param($commandName, $parameterName, $wordToComplete, $commandAst, $fakeBoundParameter)

    $culthash = @{ }
    [System.Globalization.CultureInfo]::GetCultures("AllCulture") |
    Foreach-object { $culthash.add($_.name, $_.displayname)}

    ($culthash.getenumerator()).where( { $_.key -match "^$wordToComplete" }) |
    ForEach-Object {
        [System.Management.Automation.CompletionResult]::new($_.name, $_.name, 'ParameterValue', $_.value)
    }
}