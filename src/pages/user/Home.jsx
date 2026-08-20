import React from 'react'
import { toast } from 'react-toastify';
import UserLayout from '../../layout/UserLayout';
import axios from 'axios';
import Hero from '../../component/Hero';
import BrowseByCategory from '../../component/HomeSection/BrowseByCategory';
import FeaturedRecipe from '../../component/HomeSection/FeaturedRecipe';
import BakingCompanion from '../../component/HomeSection/BakingCompanion';
import KitchenJournal from '../../component/HomeSection/KitchenJournal';
import CommunitySection from '../../component/HomeSection/CommunitySection';


const Home = () => {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleClick = () => {
        toast.success("Welcome to Cozykie!  ");
    };

    const url = "http://localhost:3000/users"

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <UserLayout>
            {/* <button onClick={handleClick}>Click</button>
            {
                data.map((item) => (
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                    </div>
                ))
            }

            {
                users.map((user) => (
                    <div key={user.id}>
                        <h2>{user.name}</h2>    
                        <h2>{user.email}</h2>    
                    </div>
                ))
            } */}




            <Hero />
            <BrowseByCategory />
            <FeaturedRecipe />
            <BakingCompanion />
            <KitchenJournal />
            <CommunitySection />

        </UserLayout>
    )
}

export default Home