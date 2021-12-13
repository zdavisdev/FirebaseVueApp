<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col d-flex justify-content-center py-5">
          <input
            type="file"
            accept="image/*"
            ref="imageInput"
            @change="onChange"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div id="preview">
          <img id="previewArea" v-if="item.imageUrl" :src="item.imageUrl" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center py-5">
        <button type="submit" class="btn btn-info">Upload to Canvas</button>
      </div>
    </div>
  </div>
</template>


<script>
import { createCanvas } from "../firebase/firebase.js";
import reactive from "vue";

//import Firebase from '../firebase/firebase'
//console.log(Firebase)
export default {
  setup() {
    const form = reactive({ image: "" });
    const onSubmit = async () => {
      await createCanvas({ ...form });
      form.image = "";
    };
    return { form, onSubmit };
  },
  name: "imageUpload",
  data() {
    return {
      item: {
        image: null,
        imageUrl: "",
      },
    };
  },
  methods: {
    onChange(e) {
      const file = e.target.files[0];
      this.image = file;
      this.item.imageUrl = URL.createObjectURL(file);
      const files = e.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;

        let binaryData = [];
        binaryData.push(this.imageUrl);
        let binaryTest = window.URL.createObjectURL(new Blob(binaryData));
        console.log(binaryTest);
        this.setData(binaryTest);
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    setData(bD) {
      let newobj = {
        newURL: {
          url: bD,
        },
      };
      createCanvas(newobj);
    },
  }
};
</script>

<style scoped>
#previewArea {
  height: 20rem;
  width: 20rem;
}
</style>