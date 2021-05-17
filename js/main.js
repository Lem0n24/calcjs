var CalculatorModel = function () {
    var self = this;
    src = "js/Model.js"
    self.commands = [
        {command: ' + '},
        {command: ' - '},
        {command: ' * '},
        {command: ' / '},
        {command: 'sin', action: 'Math.sin(__param__)'},
        {command: 'cos', action: 'Math.cos(__param__)'},
        {command: 'tan', action: 'Math.tan(__param__)'},
        {command: 'ln', action: 'Math.log(__param__)'},
        {command: 'log', action: 'Math.log(__param__) / Math.log(10)'},
    ];
    
    self.numbers = [
        {val: 7},
        {val: 8},
        {val: 9},
        {val: 4},
        {val: 5},
        {val: 6},
        {val: 1},
        {val: 2},
        {val: 3},
    ];
    self.numbers1 = [
        { val: 0 },
    ];

    // ������ ������
    self.commandline = ko.observable('');

    // ��������� �������
    self.lastCommand = ko.observable('');

    // �������
    self.needCleanup = ko.observable(false);

    // ���������� �����
    self.addNumber = function(e) {
        if (self.needCleanup()) {
            self.commandline('');
            self.needCleanup(false);
        }

        if (this.val == 0 && self.commandline() == '') {
            return;
        }
        self.commandline(self.commandline() + this.val);
    };

    // ���������� �������
    self.addCommand = function(e) {
        if (e.action && self.commandline()) { //���� ������� �� ������� ������ ��������, ��������� �����
            var newCommand = e.action.replace('__param__', self.commandline());
            self.commandline(eval(newCommand));
            self.needCleanup(true);
        }

        if (self.lastCommand() == '') { //���������� ������� ������� � ������
            if (! e.action) {
                self.commandline(self.commandline() + e.command);
            }
            self.lastCommand(e.command);
        }
    };

    //����������
    self.doCalculate = function(e) {
        self.commandline(eval(self.commandline()));

        if (self.lastCommand() != '') {
            self.lastCommand('');
        }
        self.needCleanup(true);
    };

    //��������� ���� ������ ��� �����
    self.hasNumbers = ko.computed(function() {
        return self.commandline() == '';
    }, self);
};
ko.applyBindings(new CalculatorModel());