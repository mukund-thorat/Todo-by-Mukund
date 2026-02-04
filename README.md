<h1 align="center">📝Todo By Mukund</h1>

> Simple Todo App - [ Template for FastAPI Apps ].

---
## 📌 Features
- ✅ 
- 🧩 Integrated logging for all operations
- 🔒 Full Pydantic model support
- 🔁 Type-safe input and output using Pydantic BaseModels

## 📦 Installation
```bash
pip install mongoguard
```

### Example
```python
from mongoguard import MongoGuard
from pydantic import BaseModel

mg = MongoGuard(
    mongo_url="mongodb://localhost:27017/",
    db_name="Example",
    collection_name="User"
)

class UserModel(BaseModel):
    id: int
    name: str
    email: str
    password: str

mg.fetch_collection(out_model=UserModel)
```

## ❤️ Contributing & Community
Created and maintained by **[Mukund Thorat](https://mukundthorat.framer.ai/)**.<br>
We welcome contributors to help improve MongoGuard! If you are interested in contributing or collaborating, please contact me via email: [mukundthorat.official@gmail.com](mailto:mukundthorat.official@gmail.com)

## 🔐 License
This project is licensed under the terms of the [MIT license](./LICENSE).