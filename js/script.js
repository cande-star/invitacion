// Variables globales
let mapa;
let geocoder;
let marcador;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarFechas();
    inicializarHora();
    inicializarUbicacion();
    inicializarInputs();
});

// Función para inicializar fechas
function inicializarFechas() {
    const fechaInput = document.getElementById('fechaInput');
    const fechaTexto = document.getElementById('fechaTexto');
    
    // Establecer fecha por defecto si no hay valor
    if (!fechaInput.value) {
        const fechaDefault = new Date();
        fechaDefault.setMonth(fechaDefault.getMonth() + 2);
        fechaInput.value = fechaDefault.toISOString().split('T')[0];
    }
    
    actualizarFecha();
    
    fechaInput.addEventListener('change', actualizarFecha);
}

// Función para actualizar el texto de la fecha
function actualizarFecha() {
    const fechaInput = document.getElementById('fechaInput');
    const fechaTexto = document.getElementById('fechaTexto');
    
    if (fechaInput.value) {
        const fecha = new Date(fechaInput.value);
        const opciones = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'UTC'
        };
        
        const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
        fechaTexto.textContent = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
    }
}

// Función para inicializar hora
function inicializarHora() {
    const horaInput = document.getElementById('horaInput');
    const horaTexto = document.getElementById('horaTexto');
    
    // Establecer hora por defecto
    if (!horaInput.value) {
        horaInput.value = '18:00';
    }
    
    actualizarHora();
    
    horaInput.addEventListener('change', actualizarHora);
}

// Función para actualizar el texto de la hora
function actualizarHora() {
    const horaInput = document.getElementById('horaInput');
    const horaTexto = document.getElementById('horaTexto');
    
    if (horaInput.value) {
        const [horas, minutos] = horaInput.value.split(':');
        const hora12 = convertirHora12(parseInt(horas), parseInt(minutos));
        horaTexto.textContent = hora12;
    }
}

// Función para convertir hora 24h a 12h
function convertirHora12(horas, minutos) {
    const periodo = horas >= 12 ? 'PM' : 'AM';
    const horas12 = horas % 12 || 12;
    const minutosStr = minutos.toString().padStart(2, '0');
    return `${horas12}:${minutosStr} ${periodo}`;
}

// Función para inicializar ubicación
function inicializarUbicacion() {
    const ubicacionInput = document.getElementById('ubicacionInput');
    const ubicacionTexto = document.getElementById('ubicacionTexto');
    
    // Establecer ubicación por defecto
    if (!ubicacionInput.value) {
        ubicacionInput.value = 'Salón de Eventos Las Rosas, Buenos Aires, Argentina';
        ubicacionTexto.textContent = 'Salón de Eventos Las Rosas';
    }
    
    ubicacionInput.addEventListener('change', function() {
        if (ubicacionInput.value) {
            ubicacionTexto.textContent = ubicacionInput.value;
            if (typeof initMap === 'function') {
                // Esperar a que el mapa se inicialice antes de actualizar
                setTimeout(() => actualizarMapa(ubicacionInput.value), 1000);
            }
        }
    });
}

// Función para inicializar inputs (ocultarlos por defecto y mostrar al hacer clic)
function inicializarInputs() {
    const inputs = document.querySelectorAll('.input-fecha, .input-hora, .input-ubicacion');
    const textos = document.querySelectorAll('#fechaTexto, #horaTexto, #ubicacionTexto');
    
    inputs.forEach(input => {
        input.style.display = 'none';
    });
    
    textos.forEach(texto => {
        texto.style.cursor = 'pointer';
        texto.addEventListener('click', function() {
            const inputId = this.id.replace('Texto', 'Input');
            const input = document.getElementById(inputId);
            
            if (input) {
                input.style.display = input.style.display === 'none' ? 'block' : 'none';
                if (input.style.display === 'block') {
                    input.focus();
                    input.select();
                }
            }
        });
    });
}

// Función para inicializar el mapa de Google Maps
function initMap() {
    const ubicacionInput = document.getElementById('ubicacionInput');
    const direccionInicial = ubicacionInput.value || 'Buenos Aires, Argentina';
    
    // Inicializar el mapa
    const opcionesMapa = {
        zoom: 15,
        center: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires por defecto
        styles: [
            {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#ffe5f0" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#ffe5f0" }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }]
            }
        ]
    };
    
    mapa = new google.maps.Map(document.getElementById('mapa'), opcionesMapa);
    geocoder = new google.maps.Geocoder();
    
    // Crear marcador inicial
    marcador = new google.maps.Marker({
        map: mapa,
        animation: google.maps.Animation.DROP,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#FF69B4',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 3
        }
    });
    
    // Buscar la ubicación inicial
    geocoder.geocode({ address: direccionInicial }, function(results, status) {
        if (status === 'OK') {
            mapa.setCenter(results[0].geometry.location);
            marcador.setPosition(results[0].geometry.location);
            
            // Agregar ventana de información
            const infoWindow = new google.maps.InfoWindow({
                content: `<div style="padding: 10px; text-align: center; font-family: 'Poppins', sans-serif;">
                    <h3 style="color: #FF69B4; margin: 0 0 5px;">Boda de Rosa & Hernán</h3>
                    <p style="margin: 0; color: #666;">${direccionInicial}</p>
                </div>`
            });
            
            marcador.addListener('click', function() {
                infoWindow.open(mapa, marcador);
            });
            
            // Abrir automáticamente la ventana de información
            infoWindow.open(mapa, marcador);
        } else {
            console.error('Error al geocodificar la dirección:', status);
        }
    });
}

// Función para actualizar el mapa con una nueva dirección
function actualizarMapa(direccion) {
    if (!geocoder || !mapa) {
        console.log('El mapa aún no está inicializado');
        return;
    }
    
    geocoder.geocode({ address: direccion }, function(results, status) {
        if (status === 'OK') {
            mapa.setCenter(results[0].geometry.location);
            if (marcador) {
                marcador.setPosition(results[0].geometry.location);
            } else {
                marcador = new google.maps.Marker({
                    map: mapa,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: '#FF69B4',
                        fillOpacity: 1,
                        strokeColor: '#FFFFFF',
                        strokeWeight: 3
                    }
                });
            }
        } else {
            alert('No se pudo encontrar la ubicación. Por favor, verifique la dirección.');
        }
    });
}

// Función de fallback para el mapa
function initMapFallback() {
    const ubicacionTexto = document.getElementById('ubicacionTexto').textContent;
    document.getElementById('mapa').innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #ffe5f0 0%, #ffffff 100%); color: #FF69B4; font-family: 'Poppins', sans-serif; padding: 40px; text-align: center; border-radius: 20px;">
            <div>
                <div style="font-size: 48px; margin-bottom: 20px;">📍</div>
                <h3 style="color: #FF69B4; margin-bottom: 15px; font-size: 24px;">Ubicación del Evento</h3>
                <p id="ubicacionMapaTexto" style="margin-top: 10px; font-size: 18px; color: #555; font-weight: 500;"></p>
                <p style="margin-top: 30px; font-size: 14px; color: #999;">Para ver el mapa interactivo, configura tu API key de Google Maps en el archivo index.html</p>
                <a href="#" id="linkMaps" target="_blank" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #FF69B4; color: white; text-decoration: none; border-radius: 25px; font-weight: 500;">Abrir en Google Maps</a>
            </div>
        </div>
    `;
    
    document.getElementById('ubicacionMapaTexto').textContent = ubicacionTexto;
    const linkMaps = document.getElementById('linkMaps');
    if (linkMaps) {
        linkMaps.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ubicacionTexto)}`;
    }
}

// Función para manejar errores si Google Maps no carga
window.gm_authFailure = function() {
    initMapFallback();
};

// Verificar si Google Maps está disponible después de un tiempo
setTimeout(function() {
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.log('Google Maps no está disponible, usando mapa alternativo');
        initMapFallback();
    }
}, 3000);

// Animación suave al cargar la página
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

