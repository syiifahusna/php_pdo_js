<?php
    require("conn.php");

    if(isset($_POST["load"])){
        $sql = "SELECT id,name,email,address FROM students";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        // set the resulting array to associative
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
                
        if ($stmt->rowCount() > 0) {
            $toJson = json_encode($stmt->fetchAll());
            print_r($toJson);
            // output data of each row
        } else {
            //blank
        }
        
    }else if(isset($_POST["insert"])){

        //get posted value
        $name = $_POST["name"];
        $email = $_POST["email"];
        $address = $_POST["address"];

        $sql = "INSERT INTO students (name, email, address) VALUES (:stud_name, :stud_email, :stud_address)";
        
        $stmt = $conn->prepare($sql);
        // bind params
        $stmt->bindParam(':stud_name', $name);
        $stmt->bindParam(':stud_email', $email);
        $stmt->bindParam(':stud_address', $address);
        // insert a row
        $stmt->execute();

        echo "New Records Created Successfully";

    }else if(isset($_POST["edit"])){

        $id = $_POST["id"];

        $sql = "SELECT id,name,email,address FROM students WHERE id='".$id."'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        // set the resulting array to associative
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
                
        if ($stmt->rowCount() > 0) {
            $toJson = json_encode($stmt->fetchAll());
            print_r($toJson);
            // output data of each row
        } else {
            //blank
        }

    }else if(isset($_POST["update"])){
        //get posted value
        $id = $_POST["id"];
        $name = $_POST["name"];
        $email = $_POST["email"];
        $address = $_POST["address"];

        $sql = "UPDATE students SET name= :stud_name, email= :stud_email, address= :stud_address WHERE id= :stud_id";
        
        $stmt = $conn->prepare($sql);
        // bind params
        $stmt->bindParam(':stud_id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':stud_name', $name);
        $stmt->bindParam(':stud_email', $email);
        $stmt->bindParam(':stud_address', $address);

        // update row
        $stmt->execute();
        echo "Record Updated Successfully";
    
    }else if(isset($_POST["delete"])){
        
        $id = $_POST["id"];

        // sql to delete a record
        $sql = "DELETE FROM students WHERE id= :stud_id";

        $stmt = $conn->prepare($sql);
        // bind params
        $stmt->bindParam(':stud_id', $id, PDO::PARAM_INT);

        //delete row
        $stmt->execute();
        echo "Record Deleted Successfully";

    }else{
        //blank
    }

?>