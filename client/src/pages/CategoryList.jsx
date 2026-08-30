import { useEffect, useState } from "react";
import categoryService from "../services/category.service";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCategories = async () => {
        try {
            const result = await categoryService.getAllCategories();

            if (result.success) {
                setCategories(result.data);
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Cannot load categories"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) {
        return <h2>Loading categories...</h2>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Categories</h1>

            {categories.length === 0 ? (
                <p>No categories found.</p>
            ) : (
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            {category.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoryList;