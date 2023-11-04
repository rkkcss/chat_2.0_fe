import axios from "axios";

export async function uploadImage(fileFirstElement)  {
    const formData = new FormData();
    formData.append("file", fileFirstElement);
    formData.append("upload_preset", "ml_default");
    return await axios
      .post("https://api.cloudinary.com/v1_1/dmvkh8wxf/image/upload", formData)
      .then((res) => {
        if (res.status == 200) {
          return res?.data.secure_url;
        }
      })
      .catch((err) => console.log(err));
}