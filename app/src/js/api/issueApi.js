import axios from 'axios';

const loadIssues = () => {
  return axios.get('http://localhost:3500/api/issues');
};

const deleteIssue = (id) => {
  return axios.delete('http://localhost:3500/api/issues/'+ id);
};

export default { loadIssues, deleteIssue };