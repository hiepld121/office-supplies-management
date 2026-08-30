import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <h1>Văn Phòng Phẩm Thông Minh</h1>

                <p>
                    Hệ thống quản lý và kinh doanh văn phòng phẩm
                    trên nền tảng web.
                </p>

                <Link to="/products">
                    <button>Xem sản phẩm</button>
                </Link>
            </section>

            <section className="home-section">
                <h2>Danh mục nổi bật</h2>

                <div className="home-cards">
                    <div className="home-card">
                        <h3>Dụng cụ học tập</h3>
                        <p>
                            Bút, vở và các sản phẩm phục vụ học tập.
                        </p>
                    </div>

                    <div className="home-card">
                        <h3>Văn phòng phẩm</h3>
                        <p>
                            Các sản phẩm cần thiết cho văn phòng.
                        </p>
                    </div>

                    <div className="home-card">
                        <h3>Khuyến mãi</h3>
                        <p>
                            Những chương trình ưu đãi dành cho khách hàng.
                        </p>
                    </div>
                </div>
            </section>

            <section className="home-section">
                <h2>Mua sắm dễ dàng</h2>

                <p>
                    Tìm kiếm sản phẩm, thêm vào giỏ hàng và
                    đặt hàng trực tuyến một cách thuận tiện.
                </p>

                <Link to="/products">
                    <button>Khám phá sản phẩm</button>
                </Link>
            </section>
        </div>
    );
};

export default Home;