    $('#search').on('submit', function(e) {
        e.preventDefault()
        var query = $(this).find('input').val()

        $.ajax({
          url: 'https://quiet-inlet-67115.herokuapp.com/api/search/all',
          data: {
              q: query,
          },
        })
        .then(function(oData) {
          var beerList = ''
          console.log(oData)
          oData.forEach(function(beer){
            var beerId = beer.id
            var beerName = beer.name
            if(beer.labels !== undefined){
              var beerImg = beer.labels.medium
            } else{
              var beerImg = "https://tapintothenuttyirishman.files.wordpress.com/2016/02/beer-glass-question-mark.jpg?w=584"
            }
            beerList += '<div class="col-md-4 beerItem">'
            beerList += '<img height="300px" src="'+ beerImg+ '">'
            beerList += '<div class="beerName">'
            beerList +=  beerName
            beerList += '</div>'
            beerList += '<button data-id="'+ beerId +'" type="button" class="btn btn-warning moreInfo btn-lg" data-toggle="modal" data-target="#myModal">More Info</button>'
            beerList += '</div>'

            console.log(beerId + ' ' + beerName + ' ' + beerImg)
          })
          $('#beer-list').html(beerList)
        })
    })
    $('#beer-list').on('click', 'button' ,function(e) {
      var query = $(this).data('id')
      console.log(query)
      $.ajax({
        url: 'https://quiet-inlet-67115.herokuapp.com/api/beer/' + query,
      })
      .then(function(oData) {
        console.log(oData)
        var defaultDesc = "This beer should be bad as hell... because they didn't have a description"
        var defaultImg = "https://tapintothenuttyirishman.files.wordpress.com/2016/02/beer-glass-question-mark.jpg?w=584"
        var defaultDate = "This beer it's older than Jesus"
        var beerName = oData.name
        var beerImg = oData.labels && oData.labels.medium && oData.labels.medium || defaultImg
        var beerDesc = oData.description && true && oData.description || defaultDesc
        var beerCreationDate = oData.glass && oData.glass.createDate && oData.glass.createDate || defaultDate
        var beerAbv = oData.abv
        var beerStyle = oData.style.category.name
        var beerServing = oData.servingTemperatureDisplay


        $('#beerName').text(beerName)
        $('#beerImage').attr("src", beerImg)
        $('#beerDescription').text(beerDesc)
        $('#creationDate').text(beerCreationDate)
        $('#graduation').text(beerAbv)
        $('#beerStyle').text(beerStyle)
        $('#ServingTemperature').text(beerServing)



      })
    })

 