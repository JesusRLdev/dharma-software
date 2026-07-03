async function obtenerDatos() {
    try {
        const respuesta = await fetch('data/datos.json');
        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
        const resultado = await respuesta.json();
        
        if (!resultado.servicios || !Array.isArray(resultado.servicios)) {
            throw new Error('Estructura de servicios inválida');
        }
        if (!resultado.casosexito || !Array.isArray(resultado.casosexito)) {
            throw new Error('Estructura de casos de éxito inválida');
        }
        
        const serviciosContainer = document.getElementById('servicios-container');
        const casosexitoContainer = document.getElementById('casosexito-container');

        resultado.servicios.forEach(servicio => {
            const servicioDiv = document.createElement('div');
            servicioDiv.classList.add('col-md-3', 'mb-4');
            servicioDiv.innerHTML = `
                <div class="card h-100">
                    <i class="${servicio.icono}" style="font-size: 3rem; margin: 1rem auto; display: block;"></i>
                    <div class="card-body">
                        <h5 class="card-title">${servicio.nombre}</h5>
                        <p class="card-text">${servicio.descripcion}</p>
                    </div>
                </div>
            `;
            serviciosContainer.appendChild(servicioDiv);
        });

        resultado.casosexito.forEach(caso => {
            const casoDiv = document.createElement('div');
            casoDiv.classList.add('col-md-12', 'mb-4');
            casoDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${caso.imagen}" class="card-img-top" alt="${caso.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${caso.nombre}</h5>
                        <div class="card-text">
                            <p class="alert alert-danger"><strong>Problema:</strong> ${caso.Problema}</p>
                            <p class="alert alert-success"><strong>Solución:</strong> ${caso.Solucion}</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <p>Proyecto realizado en un periodo de ${caso.periodo}</p>
                        ${caso.url !=""? `<button class="btn btn-primary" onclick="window.location.href='${caso.url}'">Ver Proyecto</button>` : ''}
                    </div>
                </div>
            `;
            casosexitoContainer.appendChild(casoDiv);
        });

        // Cargar datos de contacto
        if (resultado.contacto) {
            const contactoContainer = document.getElementById('contacto-container');
            if (contactoContainer) {
                contactoContainer.innerHTML = `
                    <p><i class="fas fa-envelope"></i> Email: <a href="mailto:${resultado.contacto.correo}">${resultado.contacto.correo}</a></p>
                    <p><i class="fas fa-phone"></i> Teléfono: <a href="tel:${resultado.contacto.telefono}">${resultado.contacto.telefono}</a></p>
                    <p><i class="fab fa-whatsapp"></i> WhatsApp: <a href="https://wa.me/${resultado.contacto.whatsapp}" target="_blank">${resultado.contacto.whatsapp}</a></p>
                    <p><i class="fas fa-map-marker-alt"></i> ${resultado.contacto.direccion}</p>
                `;
            }
        }

    } catch (error) {
        console.error('Error al cargar datos:', error);
        const container = document.getElementById('servicios-container');
        if (container) {
            container.innerHTML = '<p class="text-danger">Error al cargar los servicios. Por favor, recarga la página.</p>';
        }
    }
};

document.addEventListener('DOMContentLoaded', obtenerDatos);