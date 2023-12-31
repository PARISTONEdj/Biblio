*** Settings ***
Library           RequestsLibrary
Library           Collections

*** Variables ***
${BASE_URL}       http://localhost:3000/emprunt/   
${ID}             658f7d707aad0a2a28196fa3   
${NO_EXISTING_ID} 999aaaa 

*** Test Cases ***
Test Ajouter Emprunt
    [Documentation]    Teste l'ajout d'un emprunt
    ${payload}    Create Dictionary    livreId=${ID}    dateEmprunt=2023-01-01
    ${response}    POST On Session    ${BASE_URL}/ajouter    json=${payload}
    ...            url=${BASE_URL}/ajouter   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200
    Should Contain    ${response.text}    Emprunt ajouté avec succès

Test Liste Emprunts
    [Documentation]    Teste la récupération de la liste des emprunts
    ${response}    GET On Session    ${BASE_URL}/liste/
    ...            url=${BASE_URL}/liste/   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200

Test Liste Non Rendus
    [Documentation]    Teste la récupération de la liste des emprunts non rendus
    ${response}    GET On Session    ${BASE_URL}/listenonrendu/
    ...            url=${BASE_URL}/listenonrendu/   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200

Test Liste Livres En Retard
    [Documentation]    Teste la récupération de la liste des livres en retard
    ${response}    GET On Session    ${BASE_URL}/penalite/
    ...            url=${BASE_URL}/penalite/   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200

Test Rendre Livre
    [Documentation]    Teste la mise à jour d'un emprunt pour le rendre
    ${response}    PUT On Session    ${BASE_URL}/update/${ID}
    ...            url=${BASE_URL}/update/${ID}   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200
    Should Contain    ${response.text}    Livre rendu avec succès

Test Recherche Emprunt
    [Documentation]    Teste la recherche d'emprunts
    ${response}    GET On Session    ${BASE_URL}/recherches/Test
    ...            url=${BASE_URL}/recherches/Test   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200
