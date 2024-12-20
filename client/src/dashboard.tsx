import { Button } from 'reactstrap';
import { useNavigate } from 'react-router';

function Dashboard() {
    const navigate = useNavigate();

    const navigateToOrderCreation = () => {
        navigate('/ordercreation', { state: { id: undefined } });
    }

    const navigateToReservationCreation = () => {
        navigate('/reservationcreation', { state: { id: undefined } })
    }

    return (
        <>
            <div id="dashboard-container" className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <div className="text-center">
                    <Button 
                        onClick={navigateToReservationCreation} 
                        color="primary" 
                        size="lg" 
                        className="m-3">
                        Create new reservation
                    </Button>
                    <Button 
                        onClick={navigateToOrderCreation} 
                        color="secondary" 
                        size="lg" 
                        className="m-3">
                        Create new order
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
