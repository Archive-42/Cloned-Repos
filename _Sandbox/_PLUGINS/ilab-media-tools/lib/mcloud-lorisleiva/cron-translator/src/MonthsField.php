<?php

namespace MediaCloud\Vendor\Lorisleiva\CronTranslator;

class MonthsField extends Field
{
    public $position = 3;

    public function translateEvery($fields)
    {
        if ($fields->day->hasType('Once')) {
            return 'the ' . $fields->day->format() . ' of every month';
        }

        return 'every month';
    }

    public function translateIncrement()
    {
        if ($this->count > 1) {
            return "{$this->count} months out of {$this->increment}";
        }

        return "every {$this->increment} months";
    }
    
    public function translateMultiple()
    {
        return "{$this->count} months a year";
    }
    
    public function translateOnce($fields)
    {
        if ($fields->day->hasType('Once')) {
            return "on {$this->format()} the {$fields->day->format()}";
        }

        return "on {$this->format()}";
    }

    public function format()
    {
        if ($this->value < 1 || $this->value > 12) {
            throw new \Exception();
        }

        return [
            1 => 'January',
            2 => 'February',
            3 => 'March',
            4 => 'April',
            5 => 'May',
            6 => 'June',
            7 => 'July',
            8 => 'August',
            9 => 'September',
            10 => 'October',
            11 => 'November',
            12 => 'December',
        ][$this->value];
    }
}
