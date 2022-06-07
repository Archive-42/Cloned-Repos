# Some useful bash functions. Could be stored in separate file or bashrc

#####################
# DIRECTORIES
#####################

# Go up N directories
function up() {
    LIMIT=$1 # Number of dirs to go up is first arg
    P=$(printf %q "$(pwd)") # Get current dir with escaped spaces
    for ((i=1; i<=LIMIT; i++))
    do
        P=$(printf %q "$(pwd)/../")
    done
    eval cd "$P" # Change dir
    export MPWD="$P"
}

# Go back to previous dir
function back() {
    LIMIT=$1
    P=$(printf %q "$(mpwd)")
    for ((i=1; i <= LIMIT; i++))
    do
        P="${P%/..}"
    done
    eval cd $P
    export MPWD=$P
}

# To make them work in the current shell and not a subshell, include the aliases in your ~/.bash_aliases
# alias up='. up.sh $1'