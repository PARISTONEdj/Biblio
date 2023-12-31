*** Settings ***
Library           RequestsLibrary
Library           Collections

*** Variables ***
${BASE_URL}       http://localhost:3000/membres   
${ID}             658f55e5da625959a431d118  
${USER_ID}        658f55e5da625959a431d118  
${NO_EXISTING_ID} 999 

*** Test Cases ***
Test Enregistrer Un Membre
    [Documentation]    Teste l'enregistrement d'un membre
    ${payload}    Create Dictionary    username=NomUtilisateur    email=example@email.com
    ${response}    POST On Session    ${BASE_URL}/register    json=${payload}
    Should Be Equal As Numbers    ${response.status_code}    200
    Should Contain    ${response.text}    Membre enregistré avec succès

Test Liste Des Membres
    [Documentation]    Teste la récupération de la liste des membres
    ${response}    GET On Session    ${BASE_URL}/liste/
    Should Be Equal As Numbers    ${response.status_code}    200

Test Supprimer Un Membre
    [Documentation]    Teste la suppression d'un membre
    ${response}    DELETE On Session    ${BASE_URL}/delete/${ID}
    Should Be Equal As Numbers    ${response.status_code}    200
    Should Contain    ${response.text}    Membre supprimé avec succès

Test Modifier Un Membre
    [Documentation]    Teste la modification d'un membre
    ${payload}    Create Dictionary    username=NouveauNom    email=new@example.com
    ${response}    PUT On Session    ${BASE_URL}/update/${USER_ID}    json=${payload}
    Should Be Equal As Numbers    ${response.status_code}    200
    Should Contain    ${response.text}    Membre modifié avec succès

Test Consulter Un Membre
    [Documentation]    Teste la consultation d'un membre
    ${response}    GET On Session    ${BASE_URL}/one/
    Should Be Equal As Numbers    ${response.status_code}    200

Test Sélectionner Un Membre
    [Documentation]    Teste la sélection d'un membre
    ${response}    GET On Session    ${BASE_URL}/selectone/${ID}
    Should Be Equal As Numbers    ${response.status_code}    200

Test Rechercher Des Membres
    [Documentation]    Teste la recherche de membres
    ${response}    GET On Session    ${BASE_URL}/recherches/Test
    Should Be Equal As Numbers    ${response.status_code}    200
