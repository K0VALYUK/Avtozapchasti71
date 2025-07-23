import fetch from 'node-fetch';
import crypto from 'crypto';

export default async function handler(req, res) {
  const { oem } = req.query;

  const login = process.env.LOGIN;
  const passwordPlain = process.env.PASSWORD;
  const passwordMD5 = crypto.createHash("md5").update(passwordPlain).digest("hex");

  if (!oem) return res.status(400).json({ error: "Артикул не указан" });

  try {
    const url = http://v01.ru/api/devinsight/search/articles/?userlogin=${login}&userpsw=${passwordMD5}&number=${oem};
    const response = await fetch(url);
    const data = await response.json();

    const first = data[0];
    if (!first) return res.json({ message: "Ничего не найдено" });

    res.json({
      brand: first.brand,
      name: first.name,
      price: first.price,
      availability: first.availability
    });
  } catch (e) {
    res.status(500).json({ error: "Ошибка при получении данных" });
  }
}
