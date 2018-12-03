echo $1
if [ $# -ne 0 ]
then
    npx reveal-md ./overview.md -w --theme solarized --highlightTheme github-gist
else
    npx reveal-md ./overview.md -w --theme moon
fi
