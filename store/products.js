import * as THREE from "three";
export const state = () => ({
  accessoriesList: [
    {
      productName: "ADATA external HDD",
      productModel: "1TB USB 3.0",
      productDescription:
        "Non nulla duis voluptate occaecat aliquip dolor id. Elit pariatur sint duis reprehenderit aliqua labore est dolor ut. Ipsum commodo elit pariatur proident. Aute magna culpa sunt non cupidatat ex enim proident.",
      productThumbnailPath:
        "/Products/Accessories/ADATA external HDD/thumbnail.png",
      productModelPath: "/ADATA external HDD/scene.gltf",
      productPrice: "33$",
      productType: "accessories",
      productScale: new THREE.Vector3(0.1, 0.1, 0.1),
      productPosition: new THREE.Vector3(0, 0, 0)
    },
    {
      productName: "Camera bag",
      productModel: "NIKON",
      productDescription:
        "Non nulla duis voluptate occaecat aliquip dolor id. Elit pariatur sint duis reprehenderit aliqua labore est dolor ut. Ipsum commodo elit pariatur proident. Aute magna culpa sunt non cupidatat ex enim proident.",
      productThumbnailPath: "/Products/Accessories/Camera bag/thumbnail.png",
      productModelPath: "/Camera bag/scene.gltf",
      productPrice: "35$",
      productType: "accessories",
      productScale: new THREE.Vector3(1, 1, 1),
      productPosition: new THREE.Vector3(0, 0, 0)
    },
    {
      productName: "Camera suite case",
      productModel: "AXEL DC",
      productDescription:
        "Non nulla duis voluptate occaecat aliquip dolor id. Elit pariatur sint duis reprehenderit aliqua labore est dolor ut. Ipsum commodo elit pariatur proident. Aute magna culpa sunt non cupidatat ex enim proident.",
      productThumbnailPath:
        "/Products/Accessories/Camera suite case/thumbnail.png",
      productModelPath: "/Camera suite case/scene.gltf",
      productPrice: "59$",
      productType: "accessories",
      productScale: new THREE.Vector3(0.9, 0.9, 0.9),
      productPosition: new THREE.Vector3(0, -1, 0)
    },
    {
      productName: "Cowboy hat",
      productModel: "Brown west",
      productDescription:
        "Non nulla duis voluptate occaecat aliquip dolor id. Elit pariatur sint duis reprehenderit aliqua labore est dolor ut. Ipsum commodo elit pariatur proident. Aute magna culpa sunt non cupidatat ex enim proident.",
      productThumbnailPath: "/Products/Accessories/Cowboy hat/thumbnail.png",
      productModelPath: "/Cowboy hat/scene.gltf",
      productPrice: "5$",
      productType: "accessories",
      productScale: new THREE.Vector3(0.8, 0.8, 0.8),
      productPosition: new THREE.Vector3(0, 0, 0)
    },
    {
      productName: "WESTERN external HDD",
      productModel: "1TB USB 3.0",
      productDescription:
        "Non nulla duis voluptate occaecat aliquip dolor id. Elit pariatur sint duis reprehenderit aliqua labore est dolor ut. Ipsum commodo elit pariatur proident. Aute magna culpa sunt non cupidatat ex enim proident.",
      productThumbnailPath:
        "/Products/Accessories/WESTERN external HDD/thumbnail.png",
      productModelPath: "/WESTERN external HDD/scene.gltf",
      productPrice: "8$",
      productType: "accessories",
      productScale: new THREE.Vector3(20, 20, 20),
      productPosition: new THREE.Vector3(1, -2, 2)
    }
  ],
  camerasList: [
    {
      productName: "Junior Camera",
      productModel: "Retro KC 200",
      productDescription:
        "Aliqua ad pariatur enim laboris proident sint ad eu nisi veniam voluptate. Reprehenderit id tempor id proident occaecat ex non ea consectetur adipisicing laborum eu cillum. Irure tempor deserunt mollit ea eiusmod culpa.",
      productModelPath: "Junior Camera/scene.gltf",
      productThumbnailPath: "/Products/Cameras/Junior Camera/thumbnail.png",
      productPrice: "35$",
      productType: "cameras",
      productScale: new THREE.Vector3(10, 10, 10),
      productPosition: new THREE.Vector3(0, -0.5, 0)
    },
    {
      productName: "Karowiczs Camera",
      productModel: "LC 200",
      productDescription:
        "Aliqua ad pariatur enim laboris proident sint ad eu nisi veniam voluptate. Reprehenderit id tempor id proident occaecat ex non ea consectetur adipisicing laborum eu cillum. Irure tempor deserunt mollit ea eiusmod culpa.",
      productModelPath: "Karowiczs Camera/scene.gltf",
      productThumbnailPath: "/Products/Cameras/Karowiczs Camera/thumbnail.png",
      productPrice: "500$",
      productType: "cameras",
      productScale: new THREE.Vector3(0.1, 0.1, 0.1),
      productPosition: new THREE.Vector3(-1, -0.5, -0.5)
    },
    {
      productName: "Lecia Camera",
      productModel: "M2",
      productDescription:
        "Aliqua ad pariatur enim laboris proident sint ad eu nisi veniam voluptate. Reprehenderit id tempor id proident occaecat ex non ea consectetur adipisicing laborum eu cillum. Irure tempor deserunt mollit ea eiusmod culpa.",
      productModelPath: "Lecia Camera/scene.gltf",
      productThumbnailPath: "/Products/Cameras/Lecia Camera/thumbnail.png",
      productPrice: "30$",
      productType: "cameras",
      productScale: new THREE.Vector3(0.01, 0.01, 0.01),
      productPosition: new THREE.Vector3(0, 1, 0)
    }
  ]
});
export const getters = {
  allCategories: state => {
    var allCategories = [];
    state.accessoriesList.forEach(element => {
      allCategories.push(element);
    });
    state.camerasList.forEach(element => {
      allCategories.push(element);
    });
    return allCategories;
  }
};
