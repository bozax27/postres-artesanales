/* ==========================================================
   CONFIGURACIÓN DEL NEGOCIO
========================================================== */

/*
    IMPORTANTE:

    Costa Rica = 506

    Tu número:
    86065264

    WhatsApp necesita el número sin:
    +
    espacios
    guiones
    paréntesis
*/

const WHATSAPP_NUMBER = "50686065264";


/* ==========================================================
   PRODUCTOS
========================================================== */

const products = [

    {
        id: 1,

        name: "Queque de banano",

        description:
            "Suave y esponjoso queque de banano con chispas de chocolate y el toque dulce de las pasas.",

        price: 3500,

        unit:
            "1 queque",

        image:
            "images/queque_de_banano.jpeg",

        category:
            "Favorito"
    },


    {
        id: 2,

        name: "Tres Leches de chocolate",

        description:
            "Delicioso y húmedo tres leches con intenso sabor a chocolate, perfecto para cualquier ocasión.",

        price: 2500,

        unit:
            "1 porción",

        image:
            "images/tres_leches.jpeg",

        category:
            "Chocolate"
    },


    {
        id: 3,

        name: "Queque de zanahoria y nueces",

        description:
            "Esponjoso queque de zanahoria con deliciosas nueces que aportan un toque especial en cada bocado.",

        price: 3500,

        unit:
            "1 queque",

        image:
            "images/casero.jpeg",

        category:
            "Especial"
    },


    {
        id: 4,

        name: "Pan casero",

        description:
            "Pan casero suave y recién horneado, ideal para acompañar un café o disfrutar en familia.",

        price: 1500,

        unit:
            "6 bollos",

        image:
            "images/casero.jpeg",

        category:
            "Panadería"
    },


    {
        id: 5,

        name: "Pan natillero",

        description:
            "Bollitos suaves y doraditos con queso, perfectos para disfrutar calientes y recién hechos.",

        price: 1500,

        unit:
            "4 bollitos",

        image:
            "images/natillero.jpeg",

        category:
            "Panadería"
    },


    {
        id: 6,

        name: "Empanadas de pollo",

        description:
            "Deliciosas empanadas rellenas de pollo, preparadas artesanalmente para disfrutar en cualquier momento.",

        price: 1500,

        unit:
            "5 unidades",

        image:
            "images/pollo.jpeg",

        category:
            "Salado"
    },


    {
        id: 7,

        name: "Empanadas de piña",

        description:
            "Empanadas con un delicioso relleno de piña, ideales para quienes disfrutan de un toque dulce y casero.",

        price: 1500,

        unit:
            "5 unidades",

        image:
            "images/pina.jpeg",

        category:
            "Dulce"
    }

];


/* ==========================================================
   CARRITO
========================================================== */

let cart = [];


/* ==========================================================
   FORMATEAR PRECIO
========================================================== */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "es-CR",
        {
            style: "currency",
            currency: "CRC",
            maximumFractionDigits: 0
        }
    ).format(price);

}


/* ==========================================================
   MOSTRAR PRODUCTOS
========================================================== */

function renderProducts() {

    const container =
        document.getElementById("productsGrid");


    container.innerHTML = "";


    products.forEach(product => {

        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.innerHTML = `

            <!-- Imagen -->

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </div>


            <!-- Contenido -->

            <div class="p-5">

                <span class="product-category">

                    ${product.category}

                </span>


                <h3 class="product-title">

                    ${product.name}

                </h3>


                <p class="product-description">

                    ${product.description}

                </p>


                <div class="mt-5">

                    <div class="flex justify-between items-end">

                        <div>

                            <div class="product-price">

                                ${formatPrice(product.price)}

                            </div>

                            <div class="product-unit">

                                ${product.unit}

                            </div>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="product-button"
                        onclick="addToCart(${product.id})"
                    >

                        Agregar al pedido

                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


/* ==========================================================
   AGREGAR PRODUCTO
========================================================== */

function addToCart(productId) {

    const product =
        products.find(
            product => product.id === productId
        );


    if (!product) {
        return;
    }


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    renderCart();


    showNotification(
        `${product.name} agregado al pedido`
    );

}


/* ==========================================================
   CAMBIAR CANTIDAD
========================================================== */

function changeQuantity(productId, amount) {

    const product =
        cart.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    product.quantity += amount;


    if (product.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }


    renderCart();

}


/* ==========================================================
   MOSTRAR CARRITO
========================================================== */

function renderCart() {

    const container =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");

    const countElement =
        document.getElementById("cartCount");


    let total = 0;

    let quantityTotal = 0;


    /* ======================================================
       CARRITO VACÍO
    ====================================================== */

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <span class="text-5xl">
                    🛍️
                </span>

                <h4 class="font-bold mt-4">

                    Tu pedido está vacío

                </h4>

                <p class="text-sm text-gray-500 mt-1">

                    Selecciona algún producto del menú.

                </p>

            </div>

        `;


        totalElement.textContent =
            "₡0";


        countElement.textContent =
            "0";


        return;
    }


    /* ======================================================
       MOSTRAR PRODUCTOS
    ====================================================== */

    container.innerHTML = "";


    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;


        total += subtotal;

        quantityTotal += item.quantity;


        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <div class="flex gap-3 min-w-0">


                <!-- Imagen -->

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <!-- Información -->

                <div class="min-w-0">

                    <h4 class="font-bold text-sm">

                        ${item.name}

                    </h4>


                    <p class="text-xs text-gray-500 mt-1">

                        ${formatPrice(item.price)}
                        ·
                        ${item.unit}

                    </p>


                    <div class="quantity-controls">

                        <button
                            type="button"
                            class="quantity-button"
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>


                        <span class="font-bold text-sm">

                            ${item.quantity}

                        </span>


                        <button
                            type="button"
                            class="quantity-button"
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>


            <!-- Subtotal -->

            <strong class="shrink-0">

                ${formatPrice(subtotal)}

            </strong>

        `;


        container.appendChild(element);

    });


    totalElement.textContent =
        formatPrice(total);


    countElement.textContent =
        quantityTotal;

}


/* ==========================================================
   OBTENER TOTAL
========================================================== */

function getCartTotal() {

    return cart.reduce(

        (total, item) => {

            return total +
                item.price * item.quantity;

        },

        0

    );

}


/* ==========================================================
   VACIAR CARRITO
========================================================== */

function clearCart() {

    if (cart.length === 0) {
        return;
    }


    const confirmed =
        confirm(
            "¿Quieres vaciar todo el pedido?"
        );


    if (!confirmed) {
        return;
    }


    cart = [];


    renderCart();

}


/* ==========================================================
   NOTIFICACIÓN
========================================================== */

function showNotification(message) {

    const notification =
        document.createElement("div");


    notification.className = `
        fixed
        bottom-6
        right-6
        z-50
        bg-[#51352B]
        text-white
        px-5
        py-4
        rounded-2xl
        shadow-2xl
        font-semibold
    `;


    notification.textContent =
        `✓ ${message}`;


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.remove();

    }, 2000);

}


/* ==========================================================
   IR AL CARRITO
========================================================== */

function scrollToPedido() {

    document
        .getElementById("pedido")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ==========================================================
   FECHA MÍNIMA
========================================================== */

function setMinimumDate() {

    const dateInput =
        document.getElementById("deliveryDate");


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.min =
        `${year}-${month}-${day}`;

}


/* ==========================================================
   FORMATEAR FECHA
========================================================== */

function formatDate(dateString) {

    const date =
        new Date(
            `${dateString}T00:00:00`
        );


    return new Intl.DateTimeFormat(
        "es-CR",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(date);

}


/* ==========================================================
   GENERAR MENSAJE
========================================================== */

function generateWhatsAppMessage() {

    const name =
        document
            .getElementById("customerName")
            .value
            .trim();


    const phone =
        document
            .getElementById("customerPhone")
            .value
            .trim();


    const deliveryDate =
        document
            .getElementById("deliveryDate")
            .value;


    const notes =
        document
            .getElementById("orderNotes")
            .value
            .trim();


    const total =
        getCartTotal();


    /* ======================================================
       PRODUCTOS
    ====================================================== */

    let productsMessage = "";


    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;


        productsMessage +=
            `• ${item.quantity} x ${item.name} (${item.unit}) — ${formatPrice(subtotal)}\n`;

    });


    /* ======================================================
       MENSAJE COMPLETO
    ====================================================== */

    const message = `

🍰 *NUEVO PEDIDO — DULCE ARTE*

👤 *Cliente:*
${name}

📱 *Teléfono:*
${phone}

📅 *Fecha deseada de entrega:*
${formatDate(deliveryDate)}

🛍️ *PRODUCTOS:*

${productsMessage}
💰 *TOTAL ESTIMADO: ${formatPrice(total)}*

📝 *Notas especiales:*
${notes || "Ninguna"}

¡Hola! Me gustaría realizar este pedido. ❤️

    `.trim();


    return message;

}


/* ==========================================================
   ENVIAR POR WHATSAPP
========================================================== */

function sendToWhatsApp(event) {

    event.preventDefault();


    /* ======================================================
       COMPROBAR CARRITO
    ====================================================== */

    if (cart.length === 0) {

        alert(
            "Debes agregar al menos un producto al pedido."
        );

        return;

    }


    /* ======================================================
       GENERAR MENSAJE
    ====================================================== */

    const message =
        generateWhatsAppMessage();


    /* ======================================================
       CODIFICAR MENSAJE
    ====================================================== */

    const encodedMessage =
        encodeURIComponent(message);


    /* ======================================================
       CONSTRUIR LINK
    ====================================================== */

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


    /* ======================================================
       ABRIR WHATSAPP
    ====================================================== */

    window.open(
        whatsappURL,
        "_blank"
    );

}


/* ==========================================================
   INICIALIZACIÓN
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderProducts();

        renderCart();

        setMinimumDate();

    }
);


/* ==========================================================
   EVENTO DEL FORMULARIO
========================================================== */

document
    .getElementById("orderForm")
    .addEventListener(
        "submit",
        sendToWhatsApp
    );