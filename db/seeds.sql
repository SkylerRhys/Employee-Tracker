INSERT INTO department (name)
VALUES ('Headquarters'), ('HR'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES  ('CEO', 1000000, 1),
        ('Cashier', 2000, 3),
        ('Head of HR', 50000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Freddie', 'Mercury', 1, 1),
        ('Bon', 'Jovi', 3, 1),
        ('Bruce', 'Springsteen', 2, 1);