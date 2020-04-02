import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";

const Navbar  = () => (
    <nav>
        <Link to="/calendar">
            <Button color="primary">Calendar</Button>
        </Link>
        <Link className="disabled-link" to="/warehouse">
            <Button color="primary" disabled>Warehouse</Button>
        </Link>
        <Link className="disabled-link" to="/report">
            <Button color="primary" disabled>Reports</Button>
        </Link>
    </nav>
);

export default Navbar;
