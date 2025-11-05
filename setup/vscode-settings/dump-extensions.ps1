# Get the list of installed extensions
$extensions = code --list-extensions

# Write the extensions to a text file
$extensions | Out-File -FilePath "vscode_extensions.txt"