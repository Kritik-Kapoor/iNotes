import React from "react";

const About = () => {
  return (
    <div>
      <p>
        iNotebook is a personal project made my <b>Kritik Kapoor</b>.{" "}
        <span>iNotebook was created using MERN stack.</span>
      </p>
      <p>
        <b>About iNotebook</b>
      </p>
      <p>
        iNotebook lets a user Signup and create their own personal account.
        After Signing up the user information is stored in the database. The
        next time the user can use the same email and password to login. It is a
        one time Signup.
      </p>
      <p>
        After creating an account the user can add his personal notes. The notes
        added by the user are saved in the database. Whenever the user wants to
        check their notes, It can be done by just logging into the users
        account.
      </p>
      <p>
        A user may Add a new note, Edit or Delete an existing personal note. To
        maintain privacy one can only view their own personal notes that are
        linked with their email.
      </p>
    </div>
  );
};

export default About;
