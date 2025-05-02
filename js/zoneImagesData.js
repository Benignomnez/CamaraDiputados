// Data structure for all image information
const zoneImagesData = {
    recepcion: {
        before: [
            {
                id: "antes1",
                file: "recepcion_antes.jpg",
                title: "Vista Principal Antes",
            },
            {
                id: "antes2",
                file: "recepcion_antes2.jpg",
                title: "Vista Secundaria Antes",
            },
        ],
        after: [
            {
                id: "despues1",
                file: "recepcion_despues3.jpg",
                title: "Vista Principal Después",
            },
            {
                id: "despues2",
                file: "area_de_espera_despues.jpg",
                title: "Área de Espera Después",
            },
            {
                id: "despues3",
                file: "area_recepcion4.jpg",
                title: "Recepción Adicional",
            },
        ],
        pairs: [
            {
                id: "1",
                before: "recepcion_antes.jpg",
                after: "recepcion_despues3.jpg",
                title: "Vista Principal",
            },
            {
                id: "2",
                before: "recepcion_antes2.jpg",
                after: "area_de_espera_despues.jpg",
                title: "Área de Espera",
            },
            {
                id: "3",
                before: "recepcion_antes.jpg",
                after: "area_recepcion4.jpg",
                title: "Vista Adicional",
            },
            {
                id: "4",
                before: "recepcion_antes2.jpg",
                after: "recepcion_despues3.jpg",
                title: "Vista Alternativa 1",
            },
            {
                id: "5",
                before: "recepcion_antes.jpg",
                after: "area_de_espera_despues.jpg",
                title: "Vista Alternativa 2",
            },
            {
                id: "6",
                before: "recepcion_antes2.jpg",
                after: "area_recepcion4.jpg",
                title: "Vista Alternativa 3",
            },
        ],
    },
    oficinas: {
        before: [
            {
                id: "antes1",
                file: "oficinas_antes.jpg",
                title: "Oficina Común - Vista Antes",
            },
            {
                id: "antes2",
                file: "oficinas_antes2.jpg",
                title: "Oficinas - Vista Secundaria Antes",
            },
            {
                id: "antes3",
                file: "oficinas_antes3.jpg",
                title: "Oficinas - Vista Adicional Antes",
            },
            {
                id: "antes4",
                file: "oficinas_antes (2).jpg",
                title: "Oficinas - Vista Alternativa Antes",
            },
        ],
        after: [
            {
                id: "despues1",
                file: "oficinas_despues.jpg",
                title: "Oficina Común - Vista Después",
            },
            {
                id: "despues2",
                file: "oficinas_despues1.jpg",
                title: "Oficinas - Vista General Después",
            },
            {
                id: "despues3",
                file: "oficina-despues2.jpg",
                title: "Oficinas - Estaciones de Trabajo",
            },
            {
                id: "despues4",
                file: "oficina_despues3.jpg",
                title: "Oficinas - Oficina Director",
            },
            {
                id: "despues5",
                file: "oficina_despues4.jpg",
                title: "Oficinas - Áreas Comunes",
            },
            {
                id: "despues6",
                file: "oficina_despues5.jpg",
                title: "Oficinas - Detalles",
            },
        ],
        pairs: [
            {
                id: "1",
                before: "oficinas_antes.jpg",
                after: "oficinas_despues.jpg",
                title: "Vista General",
            },
            {
                id: "2",
                before: "oficinas_antes2.jpg",
                after: "oficina-despues2.jpg",
                title: "Estaciones de Trabajo",
            },
            {
                id: "3",
                before: "oficinas_antes3.jpg",
                after: "oficina_despues3.jpg",
                title: "Oficina Director",
            },
            {
                id: "4",
                before: "oficinas_antes (2).jpg",
                after: "oficina_despues4.jpg",
                title: "Áreas Comunes",
            },
            {
                id: "5",
                before: "oficinas_antes.jpg",
                after: "oficina_despues5.jpg",
                title: "Detalles",
            },
        ],
    },
    cocina: {
        before: [
            {
                id: "antes1",
                file: "cocina_antes.jpg",
                title: "Cocina - Vista Principal Antes",
            },
            {
                id: "antes2",
                file: "cocina_antes2.jpg",
                title: "Cocina - Vista Secundaria Antes",
            },
        ],
        after: [
            {
                id: "despues1",
                file: "cocina_despues1.jpg",
                title: "Cocina - Vista Principal Después",
            },
            {
                id: "despues2",
                file: "cocina_despues2.jpg",
                title: "Cocina - Vista Adicional 1",
            },
            {
                id: "despues3",
                file: "cocina_despues3.jpg",
                title: "Cocina - Vista Adicional 2",
            },
            {
                id: "despues4",
                file: "cocina_despues4.jpg",
                title: "Cocina - Vista Adicional 3",
            },
            {
                id: "despues5",
                file: "cocina_despues5.jpg",
                title: "Cocina - Vista Adicional 4",
            },
        ],
        pairs: [
            {
                id: "1",
                before: "cocina_antes.jpg",
                after: "cocina_despues1.jpg",
                title: "Vista Principal",
            },
            {
                id: "2",
                before: "cocina_antes2.jpg",
                after: "cocina_despues2.jpg",
                title: "Vista Adicional 1",
            },
            {
                id: "3",
                before: "cocina_antes.jpg",
                after: "cocina_despues3.jpg",
                title: "Vista Adicional 2",
            },
            {
                id: "4",
                before: "cocina_antes2.jpg",
                after: "cocina_despues4.jpg",
                title: "Vista Adicional 3",
            },
            {
                id: "5",
                before: "cocina_antes.jpg",
                after: "cocina_despues5.jpg",
                title: "Vista Adicional 4",
            },
            {
                id: "6",
                before: "cocina_antes2.jpg",
                after: "cocina_despues1.jpg",
                title: "Vista Alternativa 1",
            },
            {
                id: "7",
                before: "cocina_antes.jpg",
                after: "cocina_despues2.jpg",
                title: "Vista Alternativa 2",
            },
            {
                id: "8",
                before: "cocina_antes2.jpg",
                after: "cocina_despues3.jpg",
                title: "Vista Alternativa 3",
            },
            {
                id: "9",
                before: "cocina_antes.jpg",
                after: "cocina_despues4.jpg",
                title: "Vista Alternativa 4",
            },
            {
                id: "10",
                before: "cocina_antes2.jpg",
                after: "cocina_despues5.jpg",
                title: "Vista Alternativa 5",
            },
        ],
    },
    archivo: {
        before: [
            {
                id: "antes1",
                file: "archivos_antes.jpg",
                title: "Archivo - Vista Área de Archivo Antes",
            },
        ],
        after: [
            {
                id: "despues1",
                file: "archivos_despues.jpg",
                title: "Archivo - Vista Área de Archivo Después",
            },
        ],
        pairs: [
            {
                id: "1",
                before: "archivos_antes.jpg",
                after: "archivos_despues.jpg",
                title: "Vista Área de Archivo",
            },
        ],
    },
    pasillo: {
        before: [
            {
                id: "antes1",
                file: "pasillos_antes.jpg",
                title: "Pasillos y Áreas Comunes Antes",
            },
            {
                id: "antes2",
                file: "pasillos_antes1.jpg",
                title: "Pasillos y Áreas Comunes Antes - Vista 2",
            },
        ],
        after: [
            {
                id: "despues2",
                file: "pasillos_despues2.jpg",
                title: "Pasillos Después - Vista 1",
            },
            {
                id: "despues3",
                file: "pasillos_despues3.jpg",
                title: "Pasillos Después - Vista 2",
            },
            {
                id: "despues4",
                file: "pasillos_despues4.jpg",
                title: "Pasillos Después - Vista 3",
            },
        ],
        pairs: [
            {
                id: "1",
                before: "pasillos_antes.jpg",
                after: "pasillos_despues2.jpg",
                title: "Vista Principal",
            },
            {
                id: "2",
                before: "pasillos_antes1.jpg",
                after: "pasillos_despues3.jpg",
                title: "Vista Adicional 1",
            },
            {
                id: "3",
                before: "pasillos_antes.jpg",
                after: "pasillos_despues4.jpg",
                title: "Vista Adicional 2",
            },
            {
                id: "4",
                before: "pasillos_antes1.jpg",
                after: "pasillos_despues2.jpg",
                title: "Vista Adicional 3",
            },
            {
                id: "5",
                before: "pasillos_antes.jpg",
                after: "pasillos_despues3.jpg",
                title: "Vista Adicional 4",
            },
            {
                id: "6",
                before: "pasillos_antes1.jpg",
                after: "pasillos_despues4.jpg",
                title: "Vista Adicional 5",
            },
        ],
    },
    oficinas_principales: {
        before: [
            {
                id: "antes1",
                file: "oficina_principal_antes.jpg",
                title: "Oficinas Principales - Vista General Antes",
            },
            {
                id: "antes2",
                file: "oficina_antes.jpg",
                title: "Oficinas Principales - Despacho Antes",
            },
        ],
        after: [
            {
                id: "despues1",
                file: "oficina_principal_despues.jpg",
                title: "Oficinas Principales - Vista General Después",
            },
            {
                id: "despues2",
                file: "oficina_principal_despues1.jpg",
                title: "Oficinas Principales - Despacho Después",
            },
            {
                id: "despues3",
                file: "oficina_principal_despues2.jpg",
                title: "Oficinas Principales - Sala de Juntas Después",
            },
            {
                id: "despues4",
                file: "oficiina_principal_despues3.jpg",
                title: "Oficinas Principales - Área de Asistentes",
            },
            {
                id: "despues5",
                file: "oficina_principal_despues4.jpg",
                title: "Oficinas Principales - Recepción Privada",
            },
            {
                id: "despues6",
                file: "oficina_principal_despues5.jpg",
                title: "Oficinas Principales - Detalles Arquitectónicos",
            },
            {
                id: "despues7",
                file: "oficina_principal_despues6.jpg",
                title: "Oficinas Principales - Vista Adicional",
            },
        ],
        pairs: [
            {
                id: "1",
                before: "oficina_principal_antes.jpg",
                after: "oficina_principal_despues.jpg",
                title: "Vista General",
            },
            {
                id: "2",
                before: "oficina_antes.jpg",
                after: "oficina_principal_despues1.jpg",
                title: "Despacho Director",
            },
            {
                id: "3",
                before: "oficina_principal_antes.jpg",
                after: "oficina_principal_despues2.jpg",
                title: "Sala de Juntas",
            },
            {
                id: "4",
                before: "oficina_antes.jpg",
                after: "oficiina_principal_despues3.jpg",
                title: "Área de Asistentes",
            },
            {
                id: "5",
                before: "oficina_principal_antes.jpg",
                after: "oficina_principal_despues4.jpg",
                title: "Recepción Privada",
            },
            {
                id: "6",
                before: "oficina_antes.jpg",
                after: "oficina_principal_despues5.jpg",
                title: "Detalles Arquitectónicos",
            },
            {
                id: "7",
                before: "oficina_principal_antes.jpg",
                after: "oficina_principal_despues6.jpg",
                title: "Vista Adicional",
            },
        ],
    },
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { zoneImagesData };
} else {
    // For browser environment
    window.zoneImagesData = zoneImagesData;
} 