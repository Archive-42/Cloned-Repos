
<#
Modified 9/29/2020 so that Invoke-Command doesn't attempt to create a remoting session to the local machine.
#Issue 90
#>
Function Get-WindowsVersion {

    [cmdletbinding()]
    [OutputType("custom object")]
    [alias('wver')]

    Param (
        [Parameter(ValueFromPipeline, ValueFromPipelineByPropertyName, Position = 0)]
        [ValidateNotNullOrEmpty()]
        [string[]]$Computername = $env:COMPUTERNAME,
        [PSCredential]$Credential,
        [switch]$UseSSL,
        [Int32]$ThrottleLimit,
        [ValidateSet('Default', 'Basic', 'Credssp', 'Digest', 'Kerberos', 'Negotiate', 'NegotiateWithImplicitCredential')]
        [ValidateNotNullorEmpty()]
        [string]$Authentication = "default"
    )

    Begin {

        Write-Verbose "[$((Get-Date).TimeOfDay) BEGIN  ] Starting $($MyInvocation.Mycommand)"

        $sb = {
            $RegPath = 'HKLM:\SOFTWARE\Microsoft\Windows nt\CurrentVersion\'

            Get-ItemProperty -Path $RegPath | Select-Object -Property ProductName, EditionID, ReleaseID, BuildBranch,
            @{Name = "Build"; Expression = {"$($_.CurrentBuild).$($_.UBR)"}},
            @{Name = "InstalledUTC"; Expression = { ([datetime]"1/1/1601").AddTicks($_.InstallTime) }},
            @{Name = "Computername"; Expression = {$env:computername}}

        } #close scriptblock

        #update PSBoundParameters so it can be splatted to Invoke-Command
        [void]$PSBoundParameters.Add("ScriptBlock", $sb)

    } #begin

    Process {
        if (Test-IsPSWindows) {

            if ($Computername -eq $ENV:Computername) {
                Write-Verbose "[$((Get-Date).TimeOfDay) PROCESS] Processing the local host"
                #remove all any passed parameters
                "Credential","UseSSL","ThrottleLimit","Authentication" | foreach-object {
                    if ($psboundparameters.ContainsKey($_)) {
                        Write-Verbose "[$((Get-Date).TimeOfDay) PROCESS] Removing parameter $_"
                        [void]($PSBoundparameters.Remove($_))
                    }
                }
            }
            else {
                [void]$PSBoundParameters.add("HideComputername", $True)
            }
            Write-Verbose "[$((Get-Date).TimeOfDay) PROCESS] Invoking command"

            $PSBoundParameters | Out-String | Write-Verbose
            $results = Invoke-Command @PSBoundParameters | Select-Object -Property * -ExcludeProperty RunspaceID, PS*
            if ($Results) {
                foreach ($item in $results) {

                    [pscustomobject]@{
                        PSTypeName   = "WindowsVersion"
                        ProductName  = $item.ProductName
                        EditionID    = $item.EditionID
                        ReleaseID    = $item.ReleaseID
                        Build        = $item.Build
                        Branch       = $item.BuildBranch
                        InstalledUTC = $item.InstalledUTC
                        Computername = $item.Computername
                    }
                }
            }
        }
        else {
            Write-Warning "This command requires a Windows platform"
        }

    } #process

    End {

        Write-Verbose "[$((Get-Date).TimeOfDay)END    ] Ending $($MyInvocation.Mycommand)"

    } #end
} #close function


Function Get-WindowsVersionString {

    [cmdletbinding()]
    [OutputType("system.string")]

    Param (
        [Parameter(ValueFromPipeline, ValueFromPipelineByPropertyName, Position = 0)]
        [ValidateNotNullOrEmpty()]
        [string[]]$Computername = $env:COMPUTERNAME,
        [PSCredential]$Credential,
        [switch]$UseSSL,
        [Int32]$ThrottleLimit,
        [ValidateSet('Default', 'Basic', 'Credssp', 'Digest', 'Kerberos', 'Negotiate', 'NegotiateWithImplicitCredential')]
        [ValidateNotNullorEmpty()]
        [string]$Authentication = "default"
    )

    Begin {
        Write-Verbose "[$((Get-Date).TimeOfDay) BEGIN  ] Starting $($MyInvocation.Mycommand)"
    } #begin

    Process {
        Write-Verbose "[$((Get-Date).TimeOfDay) PROCESS] Calling Get-WindowsVersion"
        $results = Get-WindowsVersion @PSBoundParameters

        #write a version string for each computer
    `   foreach ($result in $results) {
            "{3} {0} Version {1} (OS Build {2})" -f $result.ProductName, $result.EditionID, $result.build, $result.computername
        }

    } #process

    End {
        Write-Verbose "[$((Get-Date).TimeOfDay) END    ] Ending $($MyInvocation.Mycommand)"
    } #end
}