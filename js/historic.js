console.info('carregou file historic');

$(document).on('pageinit', '#historic', function(){        
	queryHistoric();
	console.info('carregou pageinit historic'); 

});
        

				
				
function queryHistoric() {
	
		$.ajax({
			url: 'http://demo.rastrear.club:8037/rastrear/query.historic.rule',
			// dataType: "jsonp", 
			data: {sys:'RST', deviceid:rastrear.deviceidCorrent, qtd:100},
			type:"POST",
			async: true,
			success: function (result) { 
				//$('#listaHistorico').empty(); 
				$('#listaHistorico').children().first()[0].innerHTML = rastrear.vehicles[rastrear.deviceidCorrent].placa +' '+ rastrear.vehicles[rastrear.deviceidCorrent].modelo
				rastrear.queryHistoric.run(result); },
			error: function (request,error) { console.error('Network error has occurred please try again!'); }
	});  
}        
        
							
rastrear.queryHistoric = {  
		run:function(result){  
				$.each(result, function(i, row) {		
						row.attributes = JSON.parse(row.attributes);
						// Obter parametro da ignição E definir uma cor confome status.
						var ign = row.attributes.status.toString().substr(-1);
						var ignColor = ("13579".indexOf(ign) < 1) ? 'red' : 'green';
						

						$('#listaHistorico').append('<li data-theme="c" data-icon="location" id="' +row.id+ '">'
						+ '<a href="#fleetPopupOptions" data-rel="popup" data-position-to="window" data-transition="pop" data-id="' + row.id + '" > '
						+ '<h2 style="font-weight;font-size:70%;text-align:right !important;">' +row.fixtime+' </h2>'
//						+ '<h3 id="modelo">' + row.placa+' '+row.modelo + '</h3>'
						+ '<p>' +(row.address==undefined ? "&nbsp;" : row.address)+ '</p>'
						+ '<p style="float:left;font-weight: bold;font-size:80%"><i class="fa fa-' +row.tipo+ '" style="font-size:15px;color:'+ignColor+';"></i>&nbsp;&nbsp;' +Math.round(row.speed)+ ' Km/h | ' + '<i class="fa fa-tachometer" aria-hidden="true" style="font-size:140%"></i>&nbsp;&nbsp;' +(row.attributes.odometer-2246)+ '</p>'
						+ '</a></li>');
				});
				$('#listaHistorico').listview('refresh');     $("#listaHistorico li").click(function(){id=this.id;});
		}
}
