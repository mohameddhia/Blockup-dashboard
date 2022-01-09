import React, { Component } from 'react';
import { convertBytes } from './helpers';
import { Navbar } from './Navbar';
import moment from 'moment'

class Dashboard extends Component {

    render() {
        return (
            < div>

                <Navbar account={this.state.account} />
                {
                    this.state.loading
                        ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                        : <Main
                            files={this.state.files}
                            captureFile={this.captureFile}
                            uploadFile={this.uploadFile}
                        />
                }

                <Navbar />
                <div />
                <div className="container-fluid mt-5 text-center">
                    <div className="row">
                        <main role="main" className="col-lg-12 ml-auto mr-auto " style={{ maxWidth: '1024px' }}>
                            <div className="content">
                                <p>&nbsp;</p>
                                <div className="card mb-3 mx-auto bg-light" style={{ maxWidth: '512px' }}>
                                    <h2 className="text-grey text-monospace bg-light "><b><ins>upload Backup</ins></b></h2>
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const description = this.fileDescription.value
                                        this.props.uploadFile(description)
                                    }} >
                                        <div className="form-group">
                                            <br></br>
                                            <input
                                                id="fileDescription"
                                                type="text"
                                                ref={(input) => { this.fileDescription = input }}
                                                className="form-control text-monospace"
                                                placeholder="description..."
                                                required />
                                        </div>
                                        <input type="file" onChange={this.props.captureFile} className="text-black text-monospace" />
                                        <button type="submit" className="btn-primary btn-block"><b>Upload!</b></button>
                                    </form>
                                </div>
                                <p>&nbsp;</p>
                                <table className="table-sm rounded-circle   text-monospace" style={{ width: '1000px', maxHeight: '450px' }}>
                                    <thead style={{ 'fontSize': '15px' }}>
                                        <tr className="bg-primary text-white">
                                            <th scope="col" style={{ width: '10px' }}>id</th>
                                            <th scope="col" style={{ width: '200px' }}>name</th>
                                            <th scope="col" style={{ width: '230px' }}>description</th>
                                            <th scope="col" style={{ width: '120px' }}>type</th>
                                            <th scope="col" style={{ width: '90px' }}>size</th>
                                            <th scope="col" style={{ width: '90px' }}>date</th>
                                            <th scope="col" style={{ width: '120px' }}>uploader/view</th>
                                            <th scope="col" style={{ width: '120px' }}>hash/view/get</th>
                                        </tr>
                                    </thead>
                                    {this.props.files.map((file, key) => {
                                        return (
                                            <thead style={{ 'fontSize': '12px' }} key={key}>
                                                <tr>
                                                    <td>{file.fileId}</td>
                                                    <td>{file.fileName}</td>
                                                    <td>{file.fileDescription}</td>
                                                    <td>{file.fileType}</td>
                                                    <td>{convertBytes(file.fileSize)}</td>
                                                    <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                                                    <td>
                                                        <a
                                                            href={"https://etherscan.io/address/" + file.uploader}
                                                            rel="noopener noreferrer"
                                                            target="_blank">
                                                            {file.uploader.substring(0, 10)}...
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <a
                                                            href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                                                            rel="noopener noreferrer"
                                                            target="_blank">
                                                            {file.fileHash.substring(0, 10)}...
                                                        </a>
                                                    </td>
                                                </tr>
                                            </thead>
                                        )
                                    })}
                                </table>
                            </div>
                        </main>
                    </div>
                </div></div>
        );
    }
}

export default Dashboard;