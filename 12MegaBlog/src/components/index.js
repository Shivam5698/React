import { lazy } from "react";
import Header from "./Header/Header";
import Select from "./Select";
import Footer from "./Footer/Footer";
import Container from "./container/Container";
import Logo from "./Logo";
import LogoutBtn from "./Header/LogoutBtn"
const RTE = lazy(() => import('./RTE'));
import Signup from "./Signup";
import Login from "./Login";
import PostCard from "./PostCard"
import PostForm from "./post-form/PostForm"
import AuthLayout from "./AuthLayout"
import Button from "./Button";
import Input from "./Input";
import ThemeToggle from "./ThemeToggle";
import Alert from "./ui/Alert";
import EmptyState from "./ui/EmptyState";
import Skeleton from "./ui/Skeleton";
export{
    Header,
    Footer,
    Container,
    Logo,
    LogoutBtn,
    Select,
    RTE,
    Signup,
    Login,
    PostCard,
    PostForm,
    AuthLayout,
    Button,
    Input,
    ThemeToggle,
    Alert,
    EmptyState,
    Skeleton,
}