console.info('carregou file vehicles');

$(document).on('pageinit', '#vehicles', function(){        
	queryVehicles();
	console.info('carregou pageinit vehicles')
    
	$("#atualizarListaVeiculos").on("vclick",function(){
		queryVehicles();
  });
	
		
  $("#atualizarListaVeiculos").on("taphold",function(){
		window.navigator.vibrate([200]);
		console.info('Atualizacao automatica ativada!');
		setInterval(function(){ queryVehicles();; }, 10000);
  });
	
	document.documentElement.style.webkitTouchCallout = 'none';
});
        

				
function queryVehicles() {
		$.ajax({
			url: 'http://demo.rastrear.club:8037/rastrear/query.vehicles.rule?sys=RST&placa=1',
			// dataType: "jsonp", 
			type:"POST",
			async: true,
			success: function (result) { $('#listaVeiculos').empty(); rastrear.queryVehicles.run(result); },
			error: function (request,error) { console.error('Network error has occurred please try again!'); }
	});  
}        
        
								
rastrear.queryVehicles = {  
	
		run:function(result){  
				$.each(result, function(i, row) {		
						row.attributes = JSON.parse(row.attributes);
						// Obter parametro da ignição E definir uma cor confome status.
						var ign = row.attributes.status.toString().substr(-1);
						var ignColor = ("13579".indexOf(ign) < 1) ? 'red' : 'green';
						
						$('#listaVeiculos').append('<li data-theme="c" data-icon="bars" id="' +row.deviceid+ '">'
						+ '<a href="#fleetPopupOptions" data-rel="popup" data-position-to="window" data-transition="pop" data-id="' + row.id + '" > '
						+ '<span style="float:right;font-weight;font-size:70%">' +row.fixtime+' </span>'
						+ '<h3 id="modelo">' + row.placa+' '+row.modelo + '</h3>'
						+ '<p>' +(row.address==undefined ? "&nbsp;" : row.address)+ '</p>'
						+ '<p style="float:left;font-weight: bold;font-size:80%"><i class="fa fa-' +row.tipo+ '" style="font-size:15px;color:'+ignColor+';"></i>&nbsp;&nbsp;' +Math.round(row.speed)+ ' Km/h | ' + '<i class="fa fa-tachometer" aria-hidden="true" style="font-size:140%"></i>&nbsp;&nbsp;' +(row.attributes.odometer-2246)+ '</p>'
						+ '</a></li>');
						rastrear.vehicles[row.deviceid]=row;
				});
				$('#listaVeiculos').listview('refresh');     
				$("#listaVeiculos li").click(function(){
						rastrear.deviceidCorrent=this.id;
						// rastrear.modelo = this.getElementsByTagName('h3')[0].innerHTML;
						// $("#popupVeiculo").text(rastrear.modelo);
						$("#popupVeiculo").text(rastrear.vehicles[this.id].placa +' '+ rastrear.vehicles[this.id].modelo);

				});
		}
}
