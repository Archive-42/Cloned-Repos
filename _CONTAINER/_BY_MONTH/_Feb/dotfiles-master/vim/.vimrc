"""""""""""""""""""""""""""""""""""""""""""""
" VimConfig 2.0
" RIP 1.0 which got corrupted with the rest of the OS
"
" Version:
"	2.0 - 1/11/18
"	
"""""""""""""""""""""""""""""""""""""""""""""

"""""""""""""""""""""""""""""""""""""""""""""
" GENERAL
"""""""""""""""""""""""""""""""""""""""""""""

" Limit Vim's history
set history=500

" Enable filetypes
filetype plugin on
filetype indent on

" Automatically update from outside changes
set autoread

" Set W as a sudo command to save
command W w !sudo tee % > /dev/null

" Show ruler
set ruler
set number

" Increase height of bottom command bar
set cmdheight=2

" Fix backspace
set backspace=eol,start,indent
set whichwrap+=<,>,h,l

" Ignore case when searching
set ignorecase

" Better find functionality
set smartcase
set hlsearch
set incsearch

" Pad left
set foldcolumn=0

"""""""""""""""""""""""""""""""""""""""""""""
" BACKUP
"""""""""""""""""""""""""""""""""""""""""""""
set nobackup
set nowb
set noswapfile

""""""""""""""""""""""""""""""""""""""""""""""
" EDITOR
"""""""""""""""""""""""""""""""""""""""""""""

" Spaces > tabs
set expandtab
set smarttab

" Set tab to 4 spaces instead of 8
set shiftwidth=4
set tabstop=4

" Linebreak at 500 chars
set lbr
set tw=500

" Better indenting
set ai " auto indent
set si " smart indent
set wrap " wrap lines
