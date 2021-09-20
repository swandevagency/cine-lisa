import * as THREE from "three";
export const state = () => ({
  ourTechnologiesInteractionsList: [
    {
      interactionName: "Lens",
      interactionDescription:
        "Aute adipisicing adipisicing aliqua laboris qui enim eiusmod amet do adipisicing eu.",
      interactionPoint: new THREE.Vector3(0, 0.25, 1.8),
      interactionCamera: new THREE.Vector3(0, 0, 3),
      interactionFov: 2.5
    },
    {
      interactionName: "Bag",
      interactionDescription:
        "Aute adipisicing adipisicing aliqua laboris qui enim eiusmod amet do adipisicing eu.",
      interactionPoint: new THREE.Vector3(0, -1.35, -0.2),
      interactionCamera: new THREE.Vector3(-2, -4, 3),
      interactionFov: 3
    },
    {
      interactionName: "Body",
      interactionDescription:
        "Aute adipisicing adipisicing aliqua laboris qui enim eiusmod amet do adipisicing eu.",
      interactionPoint: new THREE.Vector3(0, 0, 0.1),
      interactionCamera: new THREE.Vector3(-4, 3, 3),
      interactionFov: 1.5
    },
    {
      interactionName: "Band",
      interactionDescription:
        "Aute adipisicing adipisicing aliqua laboris qui enim eiusmod amet do adipisicing eu.",
      interactionPoint: new THREE.Vector3(1.55, 0.05, -0.32),
      interactionCamera: new THREE.Vector3(50, 2, 3),
      interactionFov: 3
    }
  ]
});
