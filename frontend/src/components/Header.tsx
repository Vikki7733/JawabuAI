import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logoutUser } from "../redux/slices/authSlice";
import { FaHome, FaBook, FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../styles/components/Header.css";
import OfferSection from './OfferSection';

interface HeaderProps {
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const courses = useSelector((state: RootState) => state.auth.availableCourses);
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredSubcourseId, setHoveredSubcourseId] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsHeaderSticky(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleAppNameClick = () => {
        navigate(user ? "/dashboard" : "/");
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    const handleGoPremium = () => {
        navigate("/dashboard", { state: { scrollToOffer: true } });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setShowSuggestions(event.target.value.length > 0);
        console.log("Search Query:", event.target.value);
    };

    const handleSubcourseHover = (subcourseId: string) => {
        setHoveredSubcourseId(subcourseId);
        console.log("Hovered Subcourse ID:", subcourseId);
    };

    const renderChaptersForSubcourse = (subcourseId: string) => {
        const subcourse = courses.flatMap(course => course.subcourses).find(sub => sub.id === subcourseId);
        if (!subcourse) return null;

        return (
            <ul className="list-group">
                {subcourse.chapters.map((chapter: any) => (
                    <li key={chapter.id} className="list-group-item chapter-item">
                        {chapter.title}
                    </li>
                ))}
            </ul>
        );
    };

    const filteredSubcourses = courses.flatMap(course => course.subcourses).filter(subcourse =>
        subcourse.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredChapters = courses.flatMap(course => course.subcourses.flatMap(sub => sub.chapters)).filter(chapter =>
        chapter.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log("Filtered Subcourses:", filteredSubcourses);
    console.log("Filtered Chapters:", filteredChapters);

    return (
        <header className={`header ${isHeaderSticky ? "sticky" : ""}`}>
            <div className="app-name" onClick={handleAppNameClick}>JawabuAI</div>
            {user ? (
                <div className="nav-items">
                    <button className="nav-button" onClick={() => navigate('/dashboard')}>
                        <FaHome /> Home
                    </button>
                    <button className="nav-button" onClick={() => navigate('/courses')}>
                        <FaBook /> Courses
                    </button>
                    <div className="search-box-container">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search available courses..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                            />
                        <FaSearch className="search-icon" />
                        </div>
                        {showSuggestions && (
                            <div className="search-suggestions list-group">
                                {filteredSubcourses.map(subcourse => (
                                    <div
                                        key={subcourse.id}
                                        className="list-group-item subcourse-item"
                                        onMouseEnter={() => handleSubcourseHover(subcourse.id)}
                                        onMouseLeave={() => setHoveredSubcourseId(null)}
                                    >
                                        <span className="badge bg-primary me-2">Subcourse</span> {subcourse.title}
                                        {hoveredSubcourseId === subcourse.id && renderChaptersForSubcourse(subcourse.id)}
                                    </div>
                                ))}
                                {searchQuery && filteredChapters.map(chapter => (
                                    <div key={chapter.id} className="list-group-item chapter-item">
                                        <span className="badge bg-secondary me-2">Chapter</span> {chapter.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="btn btn-primary premium-btn" onClick={handleGoPremium}>Go Premium</button>
                    <button className="btn btn-secondary more-options">
                        <BsThreeDotsVertical />
                    </button>
                    <button className="btn btn-danger btn-logout" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="auth-buttons">
                    <button onClick={onLoginClick} className="btn btn-primary login">Login</button>
                    <button onClick={() => navigate("/register")} className="btn btn-secondary register">Register</button>
                </div>
            )}
        </header>
    );
};

export default Header;
