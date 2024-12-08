const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

async function predictClassification(model, image) {
  try {
    // Preprocess image
    const tensor = tf.node
      .decodeImage(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    // Class model
    const classes = ['Cercospora Leaf Spot', 'Common Rust', 'Northern Leaf Blight', 'Healthy Corn',
                     'Early Blight Potato', 'Late Blight Potato', 'Healthy Potato', 'Healthy Soybean',
                     'Bacterial Spot', 'Early Blight Tomato', 'Late Blight Tomato', 'Leaf Mold Tomato',
                     'Septoria Leaf Spot', 'Spider Mites', 'Target Spot', 'Tomato Yellow Leaf', 
                     'Tomato Mosaic Virus', 'Healthy Tomato'];

    // Model prediction
    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];
 
    let explanation, suggestion;

    console.log("score: ", score);
    console.log("confidenceScore: ", confidenceScore);

    if(label === 'Cercospora Leaf Spot') {
      explanation = "Cercospora Leaf Spot pada tanaman jagung adalah penyakit yang disebabkan oleh jamur Cercospora pada daun jagung, menimbulkan bercak abu-abu."
      suggestion = "Gunakan varietas tahan penyakit dan lakukan rotasi tanaman untuk mengurangi inokulum jamur."
    }

    if(label === 'Common Rust') {
      explanation = "Common Rust pada tanaman jagung adalah penyakit disebabkan oleh jamur Puccinia sorghi, menghasilkan pustula oranye di daun."
      suggestion = "Semprotkan fungisida sesuai anjuran, terutama saat tanda-tanda awal pustula muncul."
    }

    if(label === 'Northern Leaf Blight') {
      explanation = "Northern Leaf Blight pada tanaman jagung adalah penyakit disebabkan oleh jamur Exserohilum turcicum, menyebabkan bercak elips berwarna cokelat."
      suggestion = "Gunakan varietas jagung yang tahan blight dan hindari penanaman terlalu padat."
    }

    if(label === 'Healthy Corn') {
      explanation = "Kondisi tanaman jagung yang sehat tanpa gejala penyakit."
      suggestion = "Pertahankan kesehatan tanaman dengan pemupukan seimbang dan pengelolaan gulma."
    }

    if(label === 'Early Blight Potato') {
      explanation = "Early Blight pada tanaman kentang adalah penyakit disebabkan oleh jamur Alternaria solani, menghasilkan bercak cokelat konsentrik di daun."
      suggestion = "Semprotkan fungisida preventif dan hindari irigasi berlebihan untuk mencegah kelembapan berlebih."
    }

    if(label === 'Late Blight Potato') {
      explanation = "Late Blight pada tanaman kentang adalah penyakit serius oleh Phytophthora infestans, menyebabkan bercak cokelat kehitaman yang meluas."
      suggestion = "Gunakan benih bersertifikat bebas penyakit dan fungisida sistemik saat kondisi cuaca mendukung penyebaran."
    }

    if(label === 'Healthy Potato') {
      explanation = "Kondisi tanaman kentang yang sehat tanpa gejala penyakit."
      suggestion = "Pertahankan kesehatan dengan menjaga kebersihan ladang, menggunakan pupuk organik, dan memantau kondisi daun secara berkala."
    }

    if(label === 'Healthy Soybean') {
      explanation = "Kondisi tanaman kedelai yang sehat tanpa gejala penyakit."
      suggestion = "Pertahankan kesehatan dengan melakukan rotasi tanaman, memilih benih tahan penyakit, dan mengontrol serangan hama sejak dini."
    }

    if(label === 'Bacterial Spot') {
      explanation = "Bacterial Spot pada tanaman tomat adalah penyakit yang disebabkan oleh bakteri Xanthomonas spp., menghasilkan bercak hitam kecil."
      suggestion = "Hindari penyiraman dari atas (overhead irrigation) dan gunakan benih yang tahan penyakit."
    }

    if(label === 'Early Blight Tomato') {
      explanation = "Early Blight pada tanaman tomat adalah penyakit jamur yang serupa dengan kentang, dengan bercak cokelat konsentrik."
      suggestion = "Semprotkan fungisida berbasis tembaga dan pangkas daun yang terinfeksi sejak dini."
    }

    if(label === 'Late Blight Tomato') {
      explanation = "Late Blight pada tanaman tomat adalah penyakit serius pada tomat yang menyebabkan busuk daun."
      suggestion = "Gunakan varietas tahan penyakit dan fungisida berbasis tembaga sebagai pencegahan."
    }

    if(label === 'Leaf Mold Tomato') {
      explanation = "Leaf Mold pada tanaman tomat adalah penyakit disebabkan oleh Passalora fulva, menghasilkan bercak kuning di bagian bawah daun."
      suggestion = "Tingkatkan ventilasi di rumah kaca atau area tanam untuk mengurangi kelembapan."
    }

    if(label === 'Septoria Leaf Spot') {
      explanation = "Septoria Leaf Spot pada tanaman tomat adalah penyakit yang menyebabkan bercak kecil cokelat pada daun."
      suggestion = "Hindari penyiraman berlebihan dan buang daun yang terinfeksi."
    }

    if(label === 'Spider Mites') {
      explanation = "Spider Mites pada tanaman tomat adalah serangan tungau laba-laba yang menyebabkan bercak putih kecil di daun."
      suggestion = "Semprotkan air secara lembut untuk menghilangkan tungau dan gunakan minyak neem sebagai pengendali alami."
    }

    if(label === 'Target Spot') {
      explanation = "Target Spot pada tanaman tomat adalah penyakit jamur menyebabkan bercak bulat besar dengan tepi cokelat."
      suggestion = "Pangkas daun yang terinfeksi dan semprotkan fungisida yang sesuai."
    }

    if(label === 'Tomato Yellow Leaf') {
      explanation = "Tomato Yellow Leaf pada tanaman tomat adalah penyakit yang disebabkan virus yang membuat daun melengkung dan kuning."
      suggestion = "Kendalikan populasi kutu putih dengan insektisida atau perangkap kuning."
    }

    if(label === 'Tomato Mosaic Virus') {
      explanation = "Tomato Mosaic Virus pada tanaman tomat adalah penyakit yang disebabkan Virus yang membuat pola mosaik kuning-hijau pada daun."
      suggestion = "Sterilkan alat berkebun dan hindari kontak langsung dengan tanaman yang terinfeksi."
    }

    if(label === 'Healthy Tomato') {
      explanation = "Kondisi tanaman tomat yang sehat tanpa gejala penyakit."
      suggestion = "Pertahankan kesehatan dengan menggunakan pupuk kaya nutrisi, dan menjaga kebersihan area tanam."
    }

    return { label, confidenceScore, suggestion };
  } catch (error) {
    throw new InputError("Terjadi kesalahan dalam melakukan prediksi");
  }
}

module.exports = predictClassification;