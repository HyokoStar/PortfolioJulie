#Définissez l'unité d'organisation (UO) pour rechercher les utilisateurs inactifs.
$SearchCallCenterOU = « ou=,ou=,dc=,dc= »

#OU pour mettre les utilisateurs inactifs.
$MoveInactive = « ou=,ou=,ou=,dc=,dc= »

#Jours d'inactivité requis.
$daysInactive = 90

$Time = (get-Date).Adddays(-($DaysInactive))

$SearchUser = Get-ADUser -SearchBase $SearchCallCenterOU -Filter {LastLogonTimeStamp -lt $Time} -Properties LastLogonTimeStamp | Move-ADObject -TargetPath $MoveInactive

# Afficher les utilisateurs non actifs
$SearchUser 