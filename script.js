$(function() {
    const searchButton = document.getElementById("search")
    const input = document.getElementById("sum");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
        event.preventDefault()
        searchButton.click()
        }
    })

    searchButton.onclick = function() { 

        const input = document.getElementById('input')
        const msgErreur = document.getElementById('erreur')
        if (msgErreur) {
            input.removeChild(msgErreur)
        }

        const content = document.getElementById('contentApear')
        const contentDis = document.getElementById('contentDisapear')
        if(contentDis) {
            content.removeChild(contentDis)
        }

        const listUsers = document.getElementById('listUsers')
        if(listUsers){
            input.removeChild(listUsers)
        }

        const summonerName = document.getElementById("sum").value

        if (!summonerName) {
                const errorMessage = document.createElement('h4')
                errorMessage.textContent = `Please enter a summoner name.`
                const input = document.getElementById('input')
                errorMessage.setAttribute('id','erreur')
                input.appendChild(errorMessage)
        }else{
            axios.get(`http://localhost:3000/randomise/${summonerName}`)
            .then (function(response){
                if(response.data.error) {
                    const errorMessage = document.createElement('h4')
                    errorMessage.setAttribute('id','erreur')
                    errorMessage.textContent = `Please enter a valid summoner name.`
                    const input = document.getElementById('input')
                    input.appendChild(errorMessage)
                } else {        
                    const championID = response.data.randomChampionID
                    const randomChampionName = response.data.randomChampionName
                    const boots = response.data.myBoots
                    const items = response.data.myItems
                    const profileID = response.data.profileIcon
                    const masteryScore = response.data.sumScore
                    const rune = response.data.thePrincipalRunes
                    const secondaryRunes = response.data.theSecondaryRunes
                    const statMods = response.data.randomStatMods
                    const summonerSpells = response.data.chosenSummonerSpells
                    const role = response.data.chosenRole

                    const runesCategory = rune.randomRune
                    const chosenRunes =  rune.runes
                    const secondaryRunesCategory = secondaryRunes.randomSecondaryRune
                    const secondaryChosenRunes = secondaryRunes.secondaryRunes

                    $('#contentApear').append(`
                        <div id='contentDisapear'> 
                            <div id='sumInfos'>
                                <img id='profileIcon' src='http://ddragon.leagueoflegends.com/cdn/10.1.1/img/profileicon/${profileID}.png'></img>
                                <div id='divSumText'>
                                    <h5 id='sumName'>${summonerName}</h5>
                                    <h5 id='mastery'>Mastery score: ${masteryScore}</h5>
                                </div>
                            </div>
                            <div id='random'>
                                <div id='champion'>
                                    <img id='randomChampion' src='http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championID}_0.jpg'></img>
                                    <h3 id='championName'>${randomChampionName}</h3>
                                </div>
                                <div id='stuff'>
                                    <div id='role'>${role}</div>
                                    <div id='summonerSpells'></div>
                                    <img id='boots' src='http://ddragon.leagueoflegends.com/cdn/9.24.2/img/item/${boots.image.full}' title='${boots.name}'></img>
                                    <div id='itemsRandom'></div>
                                </div>
                                <div id='runes'>
                                    <div id='principal'>
                                        <div id='textprincipal'>${runesCategory}</div>
                                    </div>
                                    <div id= 'secondary'>
                                        <div id='textsecondaire'>${secondaryRunesCategory}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)

                    summonerSpells.forEach((spell, ind) => {
                        $('#summonerSpells').append(`<img  src='http://ddragon.leagueoflegends.com/cdn/10.1.1/img/spell/${spell.img}.png' id='spell${ind}' title='${spell.name}'/>`)
                    })

                    items.forEach((item, index) => {
                        $('#itemsRandom').append(`<img id='item${index}' src='http://ddragon.leagueoflegends.com/cdn/9.24.2/img/item/${item.image.full}'  title= '${item.name}'/>`)
                    })

                    chosenRunes.forEach((rune, index) => {
                        $('#principal').append(`<img src='http://ddragon.leagueoflegends.com/cdn/img/${rune.icon}' id='rune${index}' title='${rune.name}'/>`)
                    })

                    secondaryChosenRunes.forEach((rune, index) => {
                        $('#secondary').append(`<img src='http://ddragon.leagueoflegends.com/cdn/img/${rune.icon}' id='runes${index}' title='${rune.name}'/>`)
                    })
                    $('#secondary').append(`<div id='statMods' />`)

                    statMods.forEach((statmod, index) => {
                        $('#statMods').append(`<img src='StatMods/${statmod}' id='statmod${index}' />`)
                    })
                    
                    $( function() {
                        $( document ).tooltip({
                            position: {
                                my: "center bottom-20",
                                at: "center top",
                                using: function( position, feedback ) {
                                    $( this ).css( position );
                                    $( "<div>" )
                                    .addClass( "arrow" )
                                    .addClass( feedback.vertical )
                                    .addClass( feedback.horizontal )
                                    .appendTo( this );
                                }
                            }
                        })
                    })
                }
            })
        }
    }
})