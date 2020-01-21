axios.get('http://localhost:3000/latestUsers')
.then(function(response){
    const users = response.data
    users.forEach((user, index) => {
        const masteryScore = user.masteryScore
        const sumName = user.sumName
        $('#listUsers').append(`<li id='${index}'>${sumName}: ${masteryScore}</li/>`)
    });
})