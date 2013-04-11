#pragma strict

//keep game object when changing scenes


function Awake () {
    DontDestroyOnLoad (transform.gameObject);
}