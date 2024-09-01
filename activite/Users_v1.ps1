# Entrer le chemin de départ et le chemin de fin
$départ = "E:\depart"
$fin = "E:\fin"

#Ajout d'un fichier de log dans le répertoire
$Log = "E:\fin\Log.txt"

# Obtenir tout les noms des dossiers définis dans le chemin de base
$folders = Get-ChildItem -Path $départ  | Select-Object -First (Get-ChildItem -Path $départ).Count

# Vérification si le fichier de Log existe ou non
if(Test-Path $Log){
    Write-Host "Le fichier de Log existe."
    Remove-Item $Log
    $Log = New-Item -Path $fin -Name "Log.txt" -ItemType "file"
} else {
    $Log = New-Item -Path $fin -Name "Log.txt" -ItemType "file"
    Write-Host "Le fichier de Log à bien été créer"
}

# Boucle pour vérifier tout les dossiers un par un
ForEach ($file in $folders) {
    $user = Get-Acl -Path $file.FullName | Select-Object -Property  Owner

    # Déplace les dossiers sans propriétaire dans un répertoire spécifiés
    if($user -like "*HOPITAL*"){ 
        Write-Output "Le dossier '$file' à ce propriétaire : $user"
    } else {
        Move-Item -Path $file.PSPath -Destination $fin
        Write-Output "Le dossier à bien été déplacer. '$file' à ce propriétaire : $user"

        # Met les informations dans le fichiers de Log
        $file | Out-File -FilePath $Log -Append
        $user | Out-File -FilePath $Log -Append
    }
}
