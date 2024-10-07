<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Patient Management</title>

  <link rel="stylesheet" href="../css/therapist-new.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  <script defer src="../js/therapist-new.js"></script>
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
  <!-- <div class="therapist-container"> -->



  <div class="main">
    <aside class="sidebar">
      <ul>
        <li>Patient Management</li>
        <li>Schedule</li>
      </ul>
    </aside>
    <div class="card bg-light w-100 m-5 rounded-10">
      <div class="mx-2 my-4">
        <button class="btn btn-primary" onclick="handleNew()">New Patient</button>
      </div>
      <div class="card-header bg-info bg-opacity-10">
        <h4>
          Patients List
        </h4>
      </div>
      <div class="card-body ">
        <table class="table table-striped text-center ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Group</th>
              <th>Actions</th>
            </tr>

          </thead>
          <tbody>
            <!-- <tr>
                <td>Smith</td>
                <td>18</td>
                <td>male</td>
                <td>none</td>
                <td>
                  <a href="#">
                    <button class="btn btn-primary">
                      Detail
                    </button>
                  </a>
                </td>
              </tr>
              <tr>
                <td>Smith</td>
                <td>18</td>
                <td>male</td>
                <td>none</td>
                <td>
                  <a href="#">
                    <button class="btn btn-primary">
                      Detail
                    </button>
                  </a>
                </td>
              </tr> -->


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

            // 查询数据
            $sql = "SELECT id, name, age, gender, patient_group FROM patient";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
              while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["id"] . "</td>";
                echo "<td>" . $row["name"] . "</td>";
                echo "<td>" . $row["age"] . "</td>";
                echo "<td>" . $row["gender"] . "</td>";
                echo "<td>" . ($row["patient_group"] ? $row['patient_group'] : "null") . "</td>";
                echo
                  '<td>
                <a href="./therapist-detail.php?id=' . $row["id"] . '">
                  <button class="btn btn-primary">
                    Detail
                  </button>
                </a>
                </td>';
                echo "</tr>";
              }
            } else {
              echo "No patients found.";
            }

            $conn->close();
            ?>
            <!-- <tr>
              <td>Smith</td>
              <td>18</td>
              <td>male</td>
              <td>none</td>
              <td>
                <a href="#">
                  <button class="btn btn-primary">
                    Detail
                  </button>
                </a>
              </td>
            </tr> -->

          </tbody>
        </table>
      </div>
    </div>

  </div>
  <!-- </div> -->
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

  <div id="newModal" class="therapist-modal">
    <span class="cross" onclick="handleClose(event)">X</span>
    <h2 class="text-center">New Patient</h2>
    <form id="newPatientForm" action="../php/newpatient.php" method="POST">
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

      <button type="button" class="btn btn-primary w-75" onclick="handleSubmitNew()">
        Submit
      </button>
    </form>

  </div>

  <script>
    async function handleSubmitNew(){
      const form = document.getElementById('newPatientForm')
      const formData = new FormData(form); // 获取表单数据


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