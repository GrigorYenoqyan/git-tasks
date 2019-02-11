const graphConfig = new GitGraph.Template({
  colors: ['#9993FF', '#47E8D4', '#6BDB52', '#F85BB5', '#FFA657', '#F85BB5'],
  branch: {
    color: '#000000',
    lineWidth: 3,
    spacingX: 60,
    mergeStyle: 'straight',
    showLabel: true, // display branch names on graph
    labelFont: 'normal 10pt Arial',
    labelRotation: 0
  },
  commit: {
    spacingY: -30,
    dot: {
      size: 8,
      strokeColor: '#000000',
      strokeWidth: 4
    },
    tag: {
      font: 'normal 10pt Arial',
      color: 'yellow'
    },
    message: {
      color: 'black',
      font: 'normal 12pt Arial',
      displayAuthor: false,
      displayBranch: false,
      displayHash: false,
    }
  },
  arrow: {
    size: 8,
    offset: 3
  }
});

var config = {
  template: graphConfig,
  mode: 'extended',
  orientation: 'horizontal'
};

// You can manually fix columns to control the display.
var feature2Col = 0;
var featureCol = 1;
var developCol = 2;
var masterCol = 3;

const taskDescription = document.getElementById('taskDescription');

function flow1() {
  taskDescription.innerHTML = `You have <code>master</code>, <code>dev</code> branches.
<br /> 
<strong>Developer A</strong> starts working on <strong>feature 1</strong> and creates branch <code>feature-1</code> from <code>dev</code>.
<br /> 
<strong>Developer A</strong> commits his work with message <code>Add feature 1</code>.
<br /> 
<strong>Someone</strong> commits his work to <code>dev</code> branch with message <code>Add changes</code>.
<br /> 
<strong>Developer B</strong> starts working on <strong>feature 2</strong> which depends on <strong>feature 1</strong> and 
that's why <strong>Developer B</strong> creates branch <code>feature-2</code> from <code>feature-1</code>. 
<strong>Developer B</strong> commits two commits with messages <code>Add feature 2</code> and <code>Change feature 2</code>
<br /> 
<strong>Developer A</strong> continues his work and commits with message <code>Change feature 1</code>.
`;

  const gitgraph = new GitGraph(config);

  const master = gitgraph.branch({
    name: 'master',
    column: masterCol
  });

  master.commit('Initial commit');

  const dev = gitgraph.branch({
    parentBranch: master,
    name: 'dev',
    column: developCol
  });


  dev.commit('Add code');

  var feature1 = gitgraph.branch({
    parentBranch: dev,
    name: 'feature-1',
    column: featureCol
  });

  feature1.commit('Add feature 1');

  dev.commit('Add changes');

  var feature2 = gitgraph.branch({
    parentBranch: feature1,
    name: 'feature-2',
    column: feature2Col,
  });

  feature2.commit('Add feature 2');
  feature2.commit('Change feature 2');

  feature1.commit('Change feature 1');
}

function flow2() {
  taskDescription.innerHTML = `<strong>Developer A</strong> merges his branch to <code>dev</code> using <em>squash</em> merge strategy.
<br /> 
<strong>Developer A</strong> commits his work with message <code>Add feature 1</code>.
<br />
Now, <code>feature-2</code> branch contains all changes from <code>feature-1</code>.
`;

  const gitgraph = new GitGraph(config);

  const master = gitgraph.branch({
    name: 'master',
    column: masterCol
  });

  master.commit('Initial commit');

  const dev = gitgraph.branch({
    parentBranch: master,
    name: 'dev',
    column: developCol
  });


  dev.commit('Add code');

  var feature2 = gitgraph.branch({
    parentBranch: dev,
    name: 'feature-2',
    column: feature2Col,
  });

  feature2.commit('Add feature 1');
  feature2.commit('Add feature 2');
  feature2.commit('Change feature 2');

  dev.commit('Add changes');


  dev.commit('Merge in feature1:\n\nAdd feature 1\n\'Change feature 1');
}

function flow3() {
  taskDescription.innerHTML = `<strong>Developer B</strong> needs changes from <code>feature-1</code>, which 
is already merged with <code>dev</code> so he rebase his branch with
<code>dev</code> so the git diagram looks the below.
`;

  const gitgraph = new GitGraph(config);

  const master = gitgraph.branch({
    name: 'master',
    column: masterCol
  });

  master.commit('Initial commit');

  const dev = gitgraph.branch({
    parentBranch: master,
    name: 'dev',
    column: developCol
  });


  dev.commit('Add code');

  dev.commit('Add changes');
  dev.commit('Merge in feature1:\n\nAdd feature 1\n\'Change feature 1');

  var feature2 = gitgraph.branch({
    parentBranch: dev,
    name: 'feature-2',
    column: feature2Col,
  });

  feature2.commit('Add feature 2');
  feature2.commit('Change feature 2');
}
