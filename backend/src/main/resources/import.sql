INSERT INTO tb_role(authority) VALUES ('ROLE_CLIENT');
INSERT INTO tb_role(authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role(authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user(first_name, last_name, email, password, birth_date, phone_number) VALUES('Wester', 'Torres', 'wester@gmail.com', '123456', '1989-02-06', '34984456597');
INSERT INTO tb_user(first_name, last_name, email, password, birth_date, phone_number) VALUES('Dayane', 'Torres', 'dayane@gmail.com', '123456', '1988-11-02', '34998738659');
INSERT INTO tb_user(first_name, last_name, email, password, birth_date, phone_number) VALUES('Wellington', 'Santos', 'wellington@gmail.com', '123456', '1988-01-31', '34991208122');

INSERT INTO tb_user_role(user_id, role_id) VALUES (1,1);
INSERT INTO tb_user_role(user_id, role_id) VALUES (2,2);
INSERT INTO tb_user_role(user_id, role_id) VALUES (3,3);

INSERT INTO tb_category(name) VALUES ('Computadores');
INSERT INTO tb_category(name) VALUES ('Eletronicos');
INSERT INTO tb_category(name) VALUES ('Livros');

INSERT INTO tb_brand(name, image_url) VALUES ('Acer', 'picture.png');
INSERT INTO tb_brand(name, image_url) VALUES ('LG', 'picture.png');
INSERT INTO tb_brand(name, image_url) VALUES ('Editora Pearson', 'picture.png');

INSERT INTO tb_product(sku, name, description, price, image_url, units_in_stock, available, sale_off, category_id, brand_id) VALUES ('IN-01', 'Notebook Acer Aspire', 'Intel Core i5, 8gb 256gb SSD, Tela 15", Windows 11', 2689.00, 'picure.png', 10, true, false, 1, 1);
INSERT INTO tb_product(sku, name, description, price, image_url, units_in_stock, available, sale_off, category_id, brand_id) VALUES ('EL-01', 'Smart TV 40" LG', 'LED, Audio Dolby Audio, Resolução Full HD, Netflix integrado, Sistema Operacional Android, HDMI', 1899.00, 'picure.png', 10, true, false, 2, 2);
INSERT INTO tb_product(sku, name, description, price, image_url, units_in_stock, available, sale_off, category_id, brand_id) VALUES ('BK-01', 'Java Como Programar', 'Capa Luxo, 10 Edição, 968 páginas, Autor Paul Deitel-Harvey Deitel', 449.00, 'picure.png', 10, true, false, 3, 3);

INSERT INTO tb_review(comment,rate, user_id, product_id) VALUES ('Produto muito bom!', 4.8, 1, 1);
INSERT INTO tb_review(comment,rate, user_id, product_id) VALUES ('Produto excelente!', 4.7, 2, 1);
INSERT INTO tb_review(comment,rate, user_id, product_id) VALUES ('Produto maravilhoso!', 5.0, 3, 1);
