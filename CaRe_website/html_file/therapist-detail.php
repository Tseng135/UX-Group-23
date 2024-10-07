<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Patient Detail</title>

  <link rel="stylesheet" href="../css/therapist-new.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">

</head>

<body>
  <div class="top-info-bar text-center">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <i class="bi bi-envelope me-2"></i>
        <a href="mailto:support@example.com" class="text-white">support@example.com</a>
        <i class="bi bi-telephone mx-2"></i>
        <a href="tel:+1234567890" class="text-white">+123 456 7890</a>
        <i class="bi bi-geo-alt ms-2"></i>
        <a href="https://www.google.com/maps/place/12345+Adelaide" target="_blank" class="text-white">12345 Adelaide,
          Your Location</a>
      </div>
      <div>
        <a href="https://www.facebook.com" target="_blank" class="text-white me-3"><i class="bi bi-facebook"></i></a>
        <a href="https://www.google.com" target="_blank" class="text-white me-3"><i class="bi bi-google"></i></a>
        <a href="https://www.youtube.com" target="_blank" class="text-white me-3"><i class="bi bi-youtube"></i></a>
        <a href="https://www.instagram.com" target="_blank" class="text-white"><i class="bi bi-instagram"></i></a>
      </div>
    </div>
  </div>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../img/CaRe Logo.png" alt="Logo" style="height: 60px;">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
        aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#Home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#About">About</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Pages
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#patient-dashboard">Patient Dashboard</a></li>
              <li><a class="dropdown-item" href="#therapist-dashboard">Therapist Dashboard</a></li>
              <li><a class="dropdown-item" href="#admin-interface">Admin Dashboard</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#settings">Contact Us & Settings</a>
          </li>
        </ul>
        <img class="rounded-circle"
          src="https://as1.ftcdn.net/v2/jpg/00/96/18/08/1000_F_96180821_997DBv9Se82I2PrUTFppLlNmqmTjFKKE.jpg" alt=""
          width="40" height="40">

      </div>
    </div>
  </nav>
  <div class="therapist-container">
    <?php
    // 数据库连接代码
    $servername = "localhost";
    $username = "root";  // 默认用户名
    $password = "";  // 默认密码（为空）
    $dbname = "circle3";  // 假设数据库名是 hospital
    
    // 创建连接
    $conn = new mysqli($servername, $username, $password, $dbname);

    // 检查连接
    if ($conn->connect_error) {
      die("连接失败: " . $conn->connect_error);
    }

    // 假设患者的id是通过GET请求获取的
    $patient_id = isset($_GET['id']) ? intval($_GET['id']) : 1; // 默认id为1
    
    // 查询患者信息
    $sql = "SELECT id, name, age, gender, patient_group FROM patient WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $patient_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      // 获取患者信息
      $row = $result->fetch_assoc();

      // 性别转换
      $gender = $row['gender'] == 1 ? 'male' : 'female';
    }
    // 渲染页面
    




    $conn->close();
    ?>


    <div class="main">
      <aside class="sidebar">
        <ul>
          <a href="./therapist-patients.php">
            <li>Patient Management</li>
          </a>
          <li>Schedule</li>
        </ul>
      </aside>
      <div class="card bg-light w-100 m-5 rounded-10">
        <div class="card-body ">
          <h2 class="text-center">Patient Detail</h2>
          <div class="my-4">
            <button class="btn btn-primary" onclick="handleEdit()">Edit</button>
            <button class="btn btn-danger" onclick="handleDelete()">Delete</button>
          </div>
          <div class="d-flex justify-content-around flex-wrap">
            <div class="card w-40 p-4">
              <h3 class="text-center"><?php echo $row['name']; ?></h3>
              <img class="rounded-circle mx-auto d-block"
                src="https://plus.unsplash.com/premium_photo-1682096259050-361e2989706d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="" height="128" width="128">
            </div>
            <div class="card w-40 p-4">
              <h3 class="text-center">
                Basic Info
              </h3>
              <ul class="list-unstyled mx-4">
                <li>Age: <?php echo $row['age']; ?></li>
                <li>Gender: <?php echo $gender; ?></li>
                <li><a href="#">Tel: 123456</a></li>
                <li><a href="#">Email: 123456</a></li>
                <li><a href="#">Address: 123456</a></li>
              </ul>
            </div>

            <div class="card my-5 w-40 p-4">
              <h3 class="text-center">
                Prescription History
              </h3>
              <ul class="list-unstyled mx-4 fs-4">
                <li class="text-primary">6/10/2024 | Online</li>
                <li class="text-success">5/10/2024 | In person</li>
                <li class="text-primary">4/10/2024 | Online</li>
                <li class="text-success">3/10/2024 | In person</li>
              </ul>
            </div>
            <div class="card my-5 w-40 p-4 text-center">
              <h3 class="">
                Group
              </h3>
              <div class="card-body">
                <h4><?php echo ($row['patient_group'] ? $row['patient_group'] : "none"); ?></h4>
              </div>
              <div class="card-footer bg-white">
                <button class="btn btn-outline-primary" onclick="handleManage()">Manage</button>
              </div>
            </div>
          </div>
          <!-- <div class="container d-flex justify-content-around align-items-center mt-5">
            <div class="card p-4 rounded-5">
              <h2>Appointment available: </h2>
              <h3 class="text-center">5</h3>
            </div>
            <div class="card p-4 rounded-5">
              <h2>Patient available: </h2>
              <h3 class="text-center">2</h3>
            </div>
          </div> -->
        </div>
      </div>

    </div>
  </div>
  <!-- Footer Section -->
  <footer class="bg-dark text-light pt-5">
    <div class="container">
      <div class="row">
        <!-- Logo and About Section -->
        <div class="col-md-3">
          <img src="../img/CaRe Logo.png" alt="Logo" style="height: 60px;">
          <p class="mt-3">"CaRe: Compassion and Resilience for Everyone."</p>
          <div class="social-icons">
            <a href="#" class="text-white me-2"><i class="bi bi-facebook"></i></a>
            <a href="#" class="text-white me-2"><i class="bi bi-google"></i></a>
            <a href="#" class="text-white me-2"><i class="bi bi-youtube"></i></a>
            <a href="#" class="text-white me-2"><i class="bi bi-instagram"></i></a>
          </div>
        </div>
        <!-- Quick Links -->
        <div class="col-md-2">
          <h5>Quick Link</h5>
          <ul class="list-unstyled">
            <li><a href="#home" class="text-light">Home</a></li>
            <li><a href="#about" class="text-light">About</a></li>
            <li><a href="#services" class="text-light">Services</a></li>
            <li class="dropdown">
              <a href="#" class="text-light dropdown-toggle" id="pagesDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Pages
              </a>
              <ul class="dropdown-menu" aria-labelledby="pagesDropdown">
                <li><a class="dropdown-item" href="#patient-dashboard">Patient Dashboard</a></li>
                <li><a class="dropdown-item" href="#therapist-dashboard">Therapist Dashboard</a></li>
                <li><a class="dropdown-item" href="#admin-interface">Admin Dashboard</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- Latest News Section -->
        <div class="col-md-3">
          <h5>Latest News</h5>
          <ul class="list-unstyled">
            <li>
              <a href="#" class="text-light">Common misconceptions...</a>
              <p class="text-secondary small">April 17, 2024</p>
            </li>
            <li>
              <a href="#" class="text-light">Five reasons why you should invest...</a>
              <p class="text-secondary small">April 17, 2024</p>
            </li>
          </ul>
        </div>
        <!-- Newsletter Subscription -->
        <div class="col-md-4">
          <h5>Our Newsletter</h5>
          <p>Sign Up to our Newsletter to get the latest news and offers.</p>
          <form class="d-flex">
            <input type="email" class="form-control me-2" placeholder="Email Address...">
            <button class="btn btn-primary" type="submit"><i class="bi bi-telegram"></i></button>
          </form>
        </div>
      </div>
      <!-- Contact Information Row -->
      <div class="row text-center mt-4">
        <div class="col-md-4">
          <i class="bi bi-telephone-fill" style="font-size: 2rem;"></i>
          <p class="mb-0">Call us</p>
          <a href="tel:+123456789" class="text-primary">+123 456 789</a>
        </div>
        <div class="col-md-4">
          <i class="bi bi-envelope-fill" style="font-size: 2rem;"></i>
          <p class="mb-0">Mail</p>
          <a href="mailto:clinic@mail.com" class="text-primary">clinic@mail.com</a>
        </div>
        <div class="col-md-4">
          <i class="bi bi-geo-alt-fill" style="font-size: 2rem;"></i>
          <p class="mb-0">Location</p>
          <a href="#" class="text-primary">12345 Adelaide</a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      &copy; 2023 CaRe Health: <a class="text-light" href="#">www.carehealth.com</a>
    </div>
  </footer>

  <div id="editModal" class="therapist-modal">
    <span class="cross" onclick="handleClose(event)">X</span>
    <h2 class="text-center">Edit Patient</h2>
    <form id="editPatientForm" action="../php/editpatient.php" method="POST">
      <label class="w-100 text-center">
        Name:
        <input name="name" type="text">
      </label>
      <label class="w-100 text-center">
        Age:
        <input name="age" type="text">
      </label>
      <label class="w-100 text-center">
        Gender:
        <select name="gender">
          <option value="1">male</option>
          <option value="0">female</option>
        </select>
      </label>

      <button id="btn-submit" type="button" class="btn btn-primary w-75" onclick="handleSubmit()">
        Submit
      </button>
    </form>
  </div>

  <div id="groupModal" class="therapist-modal">
    <span class="cross" onclick="handleClose(event)">X</span>
    <h2 class="text-center">Group Management</h2>
    <div id="groups" class="d-flex gap-2 justify-content-around">
      <div class="card w-25" ondrop="drop(event)" ondragover="allowDrop(event)">
        <h4 class="text-center">Group1</h4>
        <div class="card-body" id="group1"></div>
      </div>
      <div class="card w-25" ondrop="drop(event)" ondragover="allowDrop(event)">
        <h4 class="text-center">Group2</h4>
        <div class="card-body" id="group2"></div>
      </div>
      <div class="card w-25" ondrop="drop(event)" ondragover="allowDrop(event)">
        <h4 class="text-center">Group3</h4>
        <div class="card-body" id="group3"></div>
      </div>
    </div>

    <div class="mt-4 d-flex justify-content-center">
      <span id="draggable" class="btn btn-outline-info" draggable="true" ondragstart="drag(event)"><?php echo $row['name']; ?></span>
    </div>

    <div class="d-flex justify-content-center">
      <button class="btn btn-primary" onclick="handleConfirm()">Confirm</button>

    </div>
  </div>

  </div>

  <script src="../js/therapist-new.js" defer></script>
  <script>
    async function handleSubmit() {
      const form = document.getElementById('editPatientForm')
      const formData = new FormData(form); // 获取表单数据
      // 从查询字符串中获取 id
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id'); // 获取 id
      formData.append('id', id)

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          alert('成功提交：');
          window.location.reload()
        } else {
          alert('提交失败');
        }
      } catch (error) {
        console.error('错误:', error);
        alert('发生错误: ' + error.message);
      }
    }
  </script>
</body>

</html>