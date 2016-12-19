var tiles = $('.HTTileCard');
var returnTiles = [];
$('.HTTileCard').each(function(){
	var returnTile = {};
	var img = $(this).find('.BTDisplayImage').find('img');
	if(img[0]){
		returnTile['fullImage'] = img[0].src;
		returnTile['originUrl'] = $(this).find('.BTOriginLink').find('a')[0].href;
		returnTile['tiledOn'] = $(this).find('.BTOriginLink').find('a')[0].text;
		returnTile['date'] = $(this).find('.BTTimestamp').text();
		returnTile['avatar'] = $(this).find('.BTCSBody').find('img')[0].src;
		returnTile['username'] = $(this).find('.BTCSBody').find('span').text();
		returnTile['tileDesc'] = $(this).find('.BTdescription').find('div')[0].innerText;
		returnTiles.push(returnTile);
	}
})

console.log(JSON.stringify(returnTiles));