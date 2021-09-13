-- CREATE extension if not exists "uuid-ossp";

--CREATE TABLE products (
--	id uuid primary key default uuid_generate_v4(),
--    title text not null,
--    description text,
--    price integer,
--    imgSrc varchar
--);


--INSERT INTO products (title, description, price, imgSrc) values
--('Clothing №1','Lorem 1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 5.5, 'https://allstars.ua/upload/iblock/c8c/c8c114f394ef5f57d3b6450b97226e25.jpg'),
--('Clothing №2','Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 19.30, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbabymod.ru%2Fimage%2Fcache%2Fcatalog%2Fexport%2FMayka_belaya_dlya_malchika000000422_1-800x800.jpg&f=1&nofb=1'),
--('Clothing №3','Lorem 3 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 56.99, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F98%2Feb%2F83%2F98eb83ff29c3339d61fe392ed068e18b.jpg&f=1&nofb=1'),
--('Clothing №4','Lorem 4 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 7.90, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fec%2Fa9%2F16%2Feca9167d9a782d36f9608c23ae0a825f--none-menswear.jpg&f=1&nofb=1'),
--('Clothing №5','Lorem 5 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 70.00, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fa.lmcdn.ru%2Fimg600x866%2FD%2FI%2FDI303EWLZZP4_12976288_1_v1.jpg&f=1&nofb=1')


--DROP TABLE products;


--CREATE TABLE if not exists stocks (
--	product_id uuid,
--	count integer,
--	foreign key ("product_id") references "products" ("id")
--)

--DROP TABLE stocks;

--INSERT INTO stocks (product_id, count) values
--('2068b4ea-6c4d-495d-9a31-2039de2cd5bd', 6),
--('7793aaee-910a-4154-baa9-a04a2f76cf21', 15),
--('90c30ba6-07d6-4712-938c-547826f59c3a', 20),
--('fdefdc8e-0e36-498d-93d5-778759b9d094', 30),
--('12874546-6725-48bc-88ed-d418f4195af1', 3)
