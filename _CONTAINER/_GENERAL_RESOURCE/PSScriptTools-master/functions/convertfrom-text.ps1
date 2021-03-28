
Function ConvertFrom-Text {

    [cmdletbinding(DefaultParameterSetname = "File")]
    [alias("cft")]
    Param(
        [Parameter(Position = 0, Mandatory, HelpMessage = "Enter a regular expression pattern that uses named captures")]
        [ValidateScript( {
                if (($_.GetGroupNames() | Where-Object {$_ -notmatch "^\d{1}$"}).Count -ge 1) {
                    $True
                }
                else {
                    Throw "No group names found in your regular expression pattern."
                }
            })]
        [Alias("regex", "rx")]
        [regex]$Pattern,

        [Parameter(Position = 1, Mandatory, ParameterSetName = 'File')]
        [ValidateScript( {Test-Path $_})]
        [alias("file")]
        [string]$Path,

        [Parameter(Position = 1, Mandatory, ValueFromPipeline, ParameterSetName = 'Inputobject')]
        [ValidateNotNullorEmpty()]
        [ValidateScript( {
                if ($_ -match "\S+") {
                    $true
                }
                else {
                    Throw "Cannot process an empty or null line of next."
                    $false
                }
            })]
        [string]$InputObject,

        [Parameter(HelpMessage = "Enter an optional typename for the object output.")]
        [ValidateNotNullorEmpty()]
        [string]$TypeName,

        [Parameter(HelpMessage = "Do not use Write-Progress to report on processing. This can improve performance on large data sets.")]
        [switch]$NoProgress
    )

    Begin {
        $begin = Get-Date
        Write-Verbose "$((Get-Date).TimeOfDay) Starting $($MyInvocation.Mycommand)"
        Write-Verbose "$((Get-Date).TimeOfDay) Using pattern $($pattern.ToString())"

        if ($NoProgress) {
            Write-Verbose "$((Get-Date).TimeOfDay) Suppressing progress bar"
            $ProgressPreference = "SilentlyContinue"
        }
        #Get the defined capture names
        $names = $pattern.GetGroupNames() | Where-Object {$_ -notmatch "^\d+$"}
        Write-Verbose "$((Get-Date).TimeOfDay) Using names: $($names -join ',')"

        #define a hashtable of parameters to splat with Write-Progress
        $progParam = @{
            Activity = $myinvocation.mycommand
            Status   = "pre-processing"
        }
    } #begin

    Process {
        If ($PSCmdlet.ParameterSetName -eq 'File') {
            Write-Verbose "$((Get-Date).TimeOfDay) Processing $Path"
            Try {
                $progParam.CurrentOperation = "Getting content from $path"
                $progParam.Status = "Processing"
                Write-Progress @progParam
                $content = Get-Content -path $path | Where-Object {$_ -match "\S+"}
                Write-Verbose "$((Get-Date).TimeOfDay) Will process $($content.count) entries"
            } #try
            Catch {
                Write-Warning "Could not get content from $path. $($_.Exception.Message)"
                Write-Verbose "$((Get-Date).TimeOfDay) Exiting function"
                #Bail out
                Return
            }
        } #if file parameter set
        else {
            Write-Verbose "$((Get-Date).TimeOfDay) processing input: $Inputobject"
            $content = $InputObject
        }

        if ($content) {
            Write-Verbose "$((Get-Date).TimeOfDay) processing content"
            $content |  foreach-object -begin {$i = 0} -process {
                #calculate percent complete
                $i++
                $pct = ($i / $content.count) * 100
                $progParam.PercentComplete = $pct
                $progParam.Status = "Processing matches"
                Write-Progress @progParam
                #process each line of the text file

                foreach ($match in $pattern.matches($_)) {
                    Write-Verbose "$((Get-Date).TimeOfDay) processing match"
                    $progParam.currentoperation = $match
                    Write-Progress @progParam

                    #get named matches and create a hash table for each one
                    $progParam.Status = "Creating objects"
                    Write-Verbose "$((Get-Date).TimeOfDay) creating objects"
                    $hash = [ordered]@{}
                    if ($TypeName) {
                        Write-Verbose "$((Get-Date).TimeOfDay) using a custom property name of $Typename"
                        $hash.Add("PSTypeName",$Typename)
                    }
                    foreach ($name in $names) {
                        $progParam.CurrentOperation = $name
                        Write-Progress @progParam
                        Write-Verbose "$((Get-Date).TimeOfDay) getting $name"
                        #initialize an ordered hash table
                        #add each name as a key to the hash table and the corresponding regex value
                        $hash.Add($name, $match.groups["$name"].value)
                    }
                    Write-Verbose "$((Get-Date).TimeOfDay) writing object to pipeline"
                    #write a custom object to the pipeline
                    [pscustomobject]$hash
                }
            } #foreach line in the content
        } #if $content
    } #process

    End {
        Write-Verbose "$((Get-Date).TimeOfDay) Ending $($MyInvocation.Mycommand)"
        $end = Get-Date
        Write-Verbose "$((Get-Date).TimeOfDay) Total processing time $($end-$begin)"
    } #end

} #end function

