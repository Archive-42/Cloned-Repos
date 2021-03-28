# Sometimes you just wanna work in PowerShell instead

###################################
# Quick Settings
###################################
$PSDefaultParameterValues["Out-File:Encoding"]="utf8" # Output files encoded with UTF-8

Set-PSReadlineKEyHander -Chord Tab - Function MenuComplete # Bind tab key to show autocomplete menu

###################################
# oh-my-posh
###################################

Import-Module posh-git
Import-Module oh-my-posh
Set-Theme Paradox

###################################
# Git
###################################

function g {
    git $args
}

function ga {
    git add $args
}

function gaa {
    git add . $args
}

function gb {
    git branch $args
}

function gc {
    git commit -m $args
}

function gca {
    git commit --amend
}

function gl {
    git log
}

function gph {
    git push $args
}

# Rebase only, merges are too messy :)
function gpl {
    git pull --rebase
}

function gs {
    git show
}

###################################
# Functions
###################################
function reload-profile {
    & $profile
}

function find-file {
    ls -recurse -filter "*$(name)*" -ErrorAction SilentlyContinue | foreach {
        $path = $_.directory
        echo "$(path)\${_}"
    }
}

###################################
# UNIX substitutes
###################################
function pwd {
    ($Env:Path).Split(";")
}

function grep($regex, $dir) {
    if ($dir) {
        ls $dir | select-string $regex
        return
    }
    $input | select-string $regex
}

function pkill($name) {
    ps $name -ErrorAction SilentlyContinue | kill
}

function touch($file) {
    "" | Out-File $file -Encoding 'utf8'
}
