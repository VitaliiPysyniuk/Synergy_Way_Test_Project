import './App.css';
import {Route, Switch} from "react-router-dom";
import {
    GroupAddComponent,
    GroupsComponent,
    NavigationComponent,
    UserAddComponent,
    UserEditComponent,
    UsersComponent,
    GroupEditComponent
} from './components';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <div>
            <NavigationComponent/>
            <Switch>
                <Route path={'/users'} exact={true} render={() => <UsersComponent/>}/>
                <Route path={'/users/add'} exact={true} render={() => <UserAddComponent/>}/>
                <Route path={'/users/:id'} render={() => <UserEditComponent/>}/>
                <Route path={'/groups'} exact={true} render={() => <GroupsComponent/>}/>
                <Route path={'/groups/add'} exact={true} render={() => <GroupAddComponent/>}/>
                <Route path={'/groups/:id'} render={() => <GroupEditComponent/>}/>
                <Route/>
            </Switch>
        </div>

    );
}

export default App;
