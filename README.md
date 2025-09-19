# ☕ Dunkin Donuts App

Proyecto final del curso de **React Native en Coderhouse** 🎓.  
Una aplicación móvil estilo **e-commerce** con carrito de compras, tickets de pedidos, perfil de usuario y sistema de ubicaciones.

---

## 🚀 Tecnologías utilizadas
- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/) (Stack, Tabs, Drawer)
- [Firebase Realtime Database](https://firebase.google.com/products/realtime-database) + Firebase Auth
- [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) para persistencia offline
- [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) (galería de fotos)
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) + [react-native-maps](https://github.com/react-native-maps/react-native-maps)

---

## ✨ Funcionalidades
- **Inicio / Categorías**: lista optimizada de categorías (cafés, postres, bebidas, etc).
- **Productos**: detalle, descripción, descuento y botón para agregar al carrito.
- **Carrito**: listado de productos, eliminación, confirmación de compra.
- **Tickets**: historial de compras confirmadas con número y fecha.
- **Perfil de usuario**: login, foto de perfil, dirección con mapa.
- **Ubicaciones**: agregar una ubicación (foto + mapa), ver listado de lugares guardados.
- **Toasts** customizados para feedback rápido.
- **Menú Drawer** con accesos a: Inicio, Ubicaciones, Agregar ubicación, Logout.
- **Persistencia**: sesión, carrito y ubicaciones guardadas en SQLite.
- **Firebase**: productos, autenticación y sincronización en tiempo real.

---

## 🛠 Instalación y ejecución
1. Clonar el repo:
   ```bash
   git clone https://github.com/usuario/Dunkin-Donuts.git
   cd Dunkin-Donuts

2. Instalar dependencias:
 npm install


3. Crear archivo .env en la raíz del proyecto con tu API Key de Firebase:
EXPO_PUBLIC_API_KEY=AIzaSyBeRW9bG_LWHqa-tF6u6H_z_-9w3dmKv_w


4. Ejecutar la app en Expo:
npx expo start


## 👨‍💻 Autor

Proyecto realizado por **Santiago Calivares** como entrega final del curso de Desarrollo de Aplicaciones en Coderhouse.