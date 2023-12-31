
*** Settings ***
Library           RequestsLibrary
Library           Collections

*** Variables ***
${BASE_URL}       http://localhost:5000/books   # Remplacez par l'URL réelle de votre API
${ID}             658f44d232cace280f590d1c   # Remplacez par un ID valide dans votre base de données
${NO_EXISTING_ID}   sdwfcgh999 

*** Test Cases ***
Test Enregistrer Un Livre
    [Documentation]    Teste l'enregistrement d'un livre
    ${payload}    Create Dictionary    title=Livre de Test    author=Auteur de Test
    ${response}    POST On Session    ${BASE_URL}/enregistrer    json=${payload}
    ...            url=${BASE_URL}/enregistrer   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200
    Should Contain    ${response.text}    Livre enregistré avec succès

Test Liste Des Livres
    [Documentation]    Teste la récupération de la liste des livres
    ${response}    GET On Session    ${BASE_URL}/liste/
    ...            url=${BASE_URL}/liste/   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200

Test Supprimer Un Livre
    [Documentation]    Teste la suppression d'un livre
    ${response}    DELETE On Session    ${BASE_URL}/delete/${ID}
    ...            url=${BASE_URL}/delete/${ID}   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200
    Should Contain    ${response.text}    Livre supprimé avec succès

Test Modifier Un Livre
    [Documentation]    Teste la modification d'un livre
    ${payload}    Create Dictionary    title=Nouveau Titre    author=Nouvel Auteur
    ${response}    PUT On Session    ${BASE_URL}/update/${ID}    json=${payload}
    ...            url=${BASE_URL}/update/${ID}   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200
    Should Contain    ${response.text}    Livre modifié avec succès

Test Consulter Un Livre
    [Documentation]    Teste la consultation d'un livre
    ${response}    GET On Session    ${BASE_URL}/selectone/${ID}
    ...            url=${BASE_URL}/selectone/${ID}   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200

Test Rechercher Des Livres
    [Documentation]    Teste la recherche de livres
    ${response}    GET On Session    ${BASE_URL}/recherches/Test
    ...            url=${BASE_URL}/recherches/Test   # Spécifiez l'URL
    Should Be Equal As Numbers    ${response.status_code}    200
