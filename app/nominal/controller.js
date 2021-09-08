const  mongoose  = require('mongoose');
const nominalModel = require('./model');
module.exports = {
  index: async(req,res) => {
      try {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");

        const alert = { message: alertMessage, status: alertStatus }
        const nominal = await nominalModel.find();
        res.render('admin/nominal/view-nominal', {nominal, alert});
      } catch (error) {
          req.flash('alertMessage', `${error.message}`);
          req.flash('alertStatus', 'danger');
          res.redirect('/nominal'); 
      }
  },
  viewCreate: async(req, res) => {
    try {
        const alertMessage = req.flash("alert message");
        const alertStatus = req.flash("alert status");
        res.render('admin/nominal/create')
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal'); 
    }
  },
  actionCreate : async(req, res) => {
    try {
        const alertMessage = req.flash("alert message");
        const alertStatus = req.flash("alert status");
        const nominal = await nominalModel({
            _id : new mongoose.Types.ObjectId,
            coinQuantity : req.body.coinQuantity,
            coinName : req.body.coinName,
            price : req.body.price
        })
        await nominal.save();

        req.flash('alertMessage', "Berhasil Tambah Data");
        req.flash('alertStatus', "success");
        res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal'); 
    }
  },
  viewEdit: async(req, res) => {
    try {
        const alertMessage = req.flash("alert message");
        const alertStatus = req.flash("alert status");
        const nominal = await nominalModel.findById({_id : req.params.id})
        res.render('admin/nominal/edit', {nominal})
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal'); 
    }
  },
  actionEdit: async(req,res) => {
    try {
      const alertMessage = req.flash("alert message");
      const alertStatus = req.flash("alert status");
      const nominal = await nominalModel.updateOne({
        _id: req.params.id
      },{name: req.body.name}).then();
      req.flash('alertMessage', "Berhasil Ubah Data");
        req.flash('alertStatus', "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal'); 
    }
  },
  actionDelete: async (req, res) => {
    try {
      const alertMessage = req.flash("alert message");
      const alertStatus = req.flash("alert status");
      const nominal = await nominalModel.deleteOne({
        _id: req.params.id
      }).then();
      req.flash('alertMessage', "Berhasil Hapus Data");
        req.flash('alertStatus', "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal'); 
    }
  }
};