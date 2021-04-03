import { React, Component, createRef } from 'react';
import {
    TextField, Grid, Typography, Button,
    TableContainer, TableBody, TableCell,
    TableHead, TableRow, Paper, Table, IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';
import CustomSnakbar from '../../Components/CustomSnakbar';
import jsPDF from "jspdf";
import "jspdf-autotable";
const classes = {
    table: {
        minWidth: 650,
    },
    root: {
        '& .MuiTextFieldRoot': {
            margin: '10px',
            width: '25ch',
        },
        textAlign: 'center'
    },
    cssInput: {
        minWidth: '150px',
        maxWidth: '500px',
        width: '100%',
        margin: '14px',
        textTransform: 'capitalize !important',
    },
    button: {
        margin: '8px'
    },
    customButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: '10px 0px 0px 0px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
}

class TicketGen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Nos: '',
            DOP: '',
            EMployee: '',
            WName: '',
            Rows: [],
            snakOpen: null,
            snakMessage: null
        };
        this.nos = createRef();
        this.dop = createRef();
        this.employee = createRef();
        this.wName = createRef();
    }

    addformRow = () => {
        debugger;
        if (this.state.Nos.trim() === '') {
            this.nos.current.children[1].children[0].focus();
            this.setState({
                snakOpen: true,
                snakMessage: 'Enter Number Of Items'
            });
        } else if (this.state.DOP.trim() === '') {
            this.dop.current.children[1].children[0].focus();
            this.setState({
                snakOpen: true,
                snakMessage: 'Enter Date Of Production'
            });
        } else if (this.state.EMployee.trim() === '') {
            this.employee.current.children[1].children[0].focus();
            this.setState({
                snakOpen: true,
                snakMessage: 'Enter Employee Name'
            });
        } else if (this.state.WName.trim() === '') {
            this.wName.current.children[1].children[0].focus();
            this.setState({
                snakOpen: true,
                snakMessage: 'Enter Work Name'
            });
        } else {
            this.setState({
                snakOpen: null,
                snakMessage: null
            });
            let newRows = [];
            newRows = this.state.Rows;
            newRows.push({
                Nos: this.state.Nos,
                DOP: this.state.DOP,
                EMployee: this.state.EMployee,
                WName: this.state.WName
            });
            this.setState({
                Rows: newRows,
                Nos: '',
                DOP: '',
                EMployee: '',
                WName: '',
            })
        }
    }
    clearForm = () => {
        this.setState({
            Rows: [],
            Nos: '',
            DOP: '',
            EMployee: '',
            WName: '',
            snakOpen: null,
            snakMessage: null
        })
    }
    OnChangeInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            snakOpen: null,
            snakMessage: null
        });
    }

    onChangeInputNumber = (e) => {
        if (!isNaN(e.target.value))
            this.setState({
                [e.target.id]: e.target.value,
                snakOpen: null,
                snakMessage: null
            });
    }

    handleClick = (newState, message) => () => {
        this.setState({ snakOpen: true, snakMessage: message });
    };

    handleClose = () => {
        this.setState({ snakOpen: false });
    };

    componentDidMount() {
        this.nos.current.children[1].children[0].focus();
    }


    deleteRow = (i) => {
        try {
            let rowData = this.state.Rows;
            rowData.splice(i, 1);
            this.setState({
                Rows: rowData,
            })
        }
        catch (e) {

        }
    }

    generatePDF = () => {
        try {
            // initialize jsPDF
            const doc = new jsPDF();

            // define an empty array of rows
            const cells = [];
            let tableCells = [];

            let rowData = this.state.Rows;
            let tableRowData = [];

            rowData.forEach((row) => {
                for (let i = 0; i < row.Nos; ++i) {
                    cells.push((i + 1) + "-" + row.DOP + "-" + row.EMployee + "\n" + row.WName);
                }
            });

            if (cells.length > 0) {

                let iStart = 0;
                let iEnd = 4;

                for (let i = 0; i < Math.ceil(cells.length / 5); ++i) {
                    for (let j = iStart; j <= iEnd; ++j) {
                        tableCells.push(cells[j] ? cells[j] : '');
                    }
                    tableRowData.push(tableCells);
                    tableCells = [];
                    iEnd += 5;
                    iStart += 5;
                }
            }

            // startY is basically margin-top
            doc.autoTable(
                ['', '', '', '', ''],
                tableRowData,
                {
                    startY: 0, margin: { top: 0, right: -1, bottom: -1, left: -1 }, theme: 'grid', showHead: 'never'
                });
            const date = Date().split(" ");
            // we use a date string to generate our filename.
            const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
            // we define the name of our PDF file.
            doc.save(`report_${dateStr}.pdf`);
        }
        catch (e) { }
    }

    render() {
        //Nos, DOP, EMployee, WName, rows
        return (
            <div style={{ flexGrow: 1, width: '98%' }}>

                <CustomSnakbar
                    open={this.state.snakOpen}
                    msg={this.state.snakMessage}
                    handleClose={this.handleClose}
                />
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <section>
                            <form id='frmDetails' style={classes.root} noValidate autoComplete="off" >
                                <Typography variant='h5' style={{ margin: '8px' }}>Ticket Generation</Typography>
                                <TextField id="Nos" label="Number Of Items" variant="outlined"
                                    ref={this.nos}
                                    onChange={this.onChangeInputNumber}
                                    value={this.state.Nos}
                                    style={classes.cssInput}
                                    inputProps={{ maxLength: 3 }}
                                />
                                <TextField id="DOP" label="Date Of Production" variant="outlined"
                                    ref={this.dop}
                                    onChange={this.OnChangeInput}
                                    value={this.state.DOP}
                                    style={classes.cssInput}
                                    inputProps={{ maxLength: 6 }}
                                />
                                <TextField id="EMployee" label="Employee Name" variant="outlined"
                                    ref={this.employee}
                                    onChange={this.OnChangeInput}
                                    value={this.state.EMployee}
                                    style={classes.cssInput} />
                                <TextField id="WName" label="Work Name" variant="outlined"
                                    ref={this.wName}
                                    onChange={this.OnChangeInput}
                                    value={this.state.WName}
                                    style={classes.cssInput} />
                                <div>  <Button
                                    variant="contained"
                                    color="secondary"
                                    style={classes.button}
                                    onClick={this.clearForm}
                                    form='frmDetails'>
                                    Clear
                        </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        form='frmDetails'
                                        dir='left'
                                        startIcon={<SaveIcon />}
                                        onClick={this.addformRow}
                                        style={classes.button
                                        }>
                                        Add
                        </Button>
                                </div>
                            </form>
                        </section>
                        <br />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <section style={{ marginTop: '10px' }}>
                            <div style={{ width: '100%', maxHeight: '80vh' }}>
                                <Typography variant='h5' style={{ margin: '8px' }}>List Of Items    </Typography>
                                <TableContainer component={Paper} elevation={0} >
                                    <Table style={classes.table} aria-label="simple table">
                                        <TableHead style={{ backgroundColor: '#ababab52' }}>
                                            <TableRow>
                                                <TableCell>No Of Items</TableCell>
                                                <TableCell >Date Of Production</TableCell>
                                                <TableCell >Employee Name</TableCell>
                                                <TableCell >Item Name</TableCell>
                                                <TableCell >Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.Rows.map((row, i) => (
                                                <TableRow key={row.name}  >
                                                    <TableCell component="th" scope="row" >
                                                        {row.Nos}
                                                    </TableCell>
                                                    <TableCell >{row.DOP}</TableCell>
                                                    <TableCell >{row.EMployee}</TableCell>
                                                    <TableCell >{row.WName}</TableCell>
                                                    <TableCell >
                                                        <IconButton title="Delete"
                                                            aria-label="delete"
                                                            className={classes.margin}
                                                            onClick={() => this.deleteRow(i)}
                                                        >
                                                            <Delete fontSize="medium" color="error" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <div id='genetepdf'>
                                {this.state.Rows && this.state.Rows.length > 0 ? <Button style={classes.customButton} onClick={this.generatePDF}>Generate PDF</Button> : <></>}
                            </div>
                        </section>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default TicketGen;