/**
* A small set of helper functions for Kattegat apps
**/
;window.kattegat = {
	// Small function to check browser
	device: {
	  android: function() {
	      return navigator.userAgent.match(/Android/i);
	  },
	  ios: function() {
	      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	  },
	  opera: function() {
	      return navigator.userAgent.match(/Opera Mini/i);
	  },
	  winphone: function() {
	      return navigator.userAgent.match(/IEMobile/i);
	  },
	  mobile: function() {
	      return (kattegat.device.android() || kattegat.device.ios() || kattegat.device.opera() || kattegat.device.winphone());
	  }
	},
	notify: function(msg, isError) {
		if (typeof isError == 'undefined') isError = false;
		var cls = "toast";
		if (isError) cls += " error";
		if (isError) {
			console.log("ERR: " + msg);
		} else {
			console.log("LOG: " + msg);
		}

		$('<div class="' + cls + '">' + msg + '</div>')
			.appendTo("body")
			.transition({opacity:1.0})
			.transition({opacity:0.0, delay: 3000}, function() {
				$(this).remove();
			});
	},
	notifyError:function(msg) {
		this.notify(msg, true);
	},

	// Makes sure that value is at least min and no greater than max
	rangeClip:function(value, min, max) {
		value = Math.min(value, max);
		value = Math.max(value, min);
		return value;
	}
}

// Helper class to smooth data values.
// See it in action above.
function Smoother(samples) {
  this.data = new Array();
  this.low = 99999999;
  this.high = 0;
  for (var i=0;i<samples; i++) {
    this.data.push(0);
  }
}
Smoother.prototype.getIndexedData = function() {
	var t = new Array();
	for (var i = this.data.length - 1; i >= 0; i--) {
		t.push([i+1, this.data[i]]);
	};
	return t;
}
Smoother.prototype.getData = function() {
	return this.data;
}
Smoother.prototype.push = function(v) {
    this.data.shift();
    this.data.push(v);
    if (v > this.high) this.high = v;
    if (v < this.low) this.low =v;
}
Smoother.prototype.getHigh = function() {
	return this.high;
}
Smoother.prototype.getLow = function() {
	return this.low;
}
Smoother.prototype.get = function() {
  var count = 0;
  for (var i=0;i<this.data.length; i++) {
    count += this.data[i];
  }
  count = count / this.data.length;
  return count;
}